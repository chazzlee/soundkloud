# frozen_string_literal: true

class Api::ProfilesController < ApplicationController
  before_action :require_logged_in, only: [:update]

  def update
    user = User.find(params[:id].to_i)
    profile = user.profile
    profile.display_name = params[:display_name] || profile.display_name
    profile.age = params[:age].to_i || profile.age
    profile.gender = params[:gender] || profile.gender
    profile.location = params[:location] || profile.location
    profile.slug = params[:display_name].parameterize || profile.slug

    # TODO:
    if params[:photo]
      # profile.photo.purge if profile.photo.attached?
      profile.photo.attach(params[:photo])
    end
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
end
