# frozen_string_literal: true

class Api::ProfilesController < ApplicationController
  def update
    user = User.find(params[:id])
    profile = user.profile
    profile.display_name = params[:display_name] || profile.display_name
    profile.age = params[:age] || profile.age
    profile.gender = params[:gender] || profile.gender
    profile.location = params[:location] || profile.location
    profile.slug = params[:slug] || profile.slug

    if profile.save
      render 'api/users/show', locals: { user: }, status: :created
    else
      render json: profile.errors.full_messages, status: :unprocessable_entity
    end
  end
end
