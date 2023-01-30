# frozen_string_literal: true

class Api::ProfilesController < ApplicationController
  before_action :require_logged_in, only: %i[update header_cover]

  def index
    users = User.includes(:profile).all
    render 'api/users/index', locals: { users: }
  end

  def update
    user = User.includes(:profile).find(params[:id].to_i)
    profile = user.profile
    profile.display_name = params[:display_name] || profile.display_name
    profile.age = params[:age].to_i || profile.age
    profile.gender = params[:gender] || profile.gender
    profile.location = params[:location] || profile.location
    profile.slug = params[:display_name].parameterize || profile.slug

    profile.photo.attach(params[:photo]) if params[:photo]

    if profile.save
      user.tracks.map do |track|
        original_permalink = URI.parse(track.permalink)
        origin = original_permalink.origin
        original_title = original_permalink.path.split('/')[1..][1]
        track.permalink = "#{origin}/#{profile.slug}/#{original_title}"
        track.save!
      end
      render 'api/users/show', locals: { user: }, status: :created
    else
      render json: profile.errors.full_messages, status: :unprocessable_entity
    end
  end

  def header_cover
    user = User.find(params[:id].to_i)
    if user.id == current_user.id
      profile = user.profile
      profile.header_cover.attach(params[:header_image]) if params[:header_image]
      if profile.save
        render 'api/users/show', locals: { user: }, status: :created
      else
        render json: profile.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: { errors: 'Cannot perform this action.' }, status: :forbidden
    end
  end
end
