# frozen_string_literal: true

class Api::TracksController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :require_logged_in, only: %i[index destroy]

  def index
    tracks = current_user.tracks.order(updated_at: :desc).limit(16)
    render template: 'api/tracks/index', locals: { tracks: }
  end

  def show
    profile = Profile.friendly.find(params[:profile_id])
    user = profile.user
    track = user.tracks.preload(:replies).friendly.find(params[:id])

    render template: 'api/tracks/show', locals: { track: }
  end

  def create
    track = current_user.tracks.build
    track.title = params[:title]
    track.artist = params[:artist]
    track.description = params[:description]
    track.caption = params[:caption]
    track.privacy = params[:privacy]
    track.genre_id = params[:genre_id]

    permalink = if Rails.env == 'development'
                  "http://localhost:3000/#{current_user.slug}/#{params[:permalink]}"
                else
                  "https://soundkloud-rails.onrender.com/#{current_user.slug}/#{params[:permalink]}"
                end
    track.permalink = permalink
    track.upload.attach(params[:upload]) if params[:upload]
    track.cover.attach(params[:cover]) if params[:cover]

    if track.save
      if params[:tags]
        tag_labels = JSON.parse(params[:tags])
        tag_labels.each do |label|
          tag = Tag.find_or_initialize_by(label:, taggable: track)
          tag.save!
        end
      end
      render template: 'api/tracks/show', locals: { track: }, status: :created
    else
      render json: { errors: track.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    track = Track.find(params[:id])

    if track.user_id == current_user.id
      track.title = params[:title]
      track.artist = params[:artist]
      track.description = params[:description]
      track.caption = params[:caption]
      track.privacy = params[:privacy]
      track.genre_id = params[:genre_id]
      permalink = if Rails.env == 'development'
                    "http://localhost:3000/#{current_user.slug}/#{params[:permalink]}"
                  else
                    "https://soundkloud-rails.onrender.com/#{current_user.slug}/#{params[:permalink]}"
                  end
      track.permalink = permalink
      if params[:cover]
        track.cover.purge if track.cover.attached?
        track.cover.attach(params[:cover])
      end

      if track.save
        render template: 'api/tracks/show', locals: { track: }, status: :created
      else
        render json: { errors: track.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end

# TODO: keep getting unpermitted params :format
# private

# def track_params
#   params
#     .permit(:title, :artist, :permalink, :description, :caption, :privacy, :genre_id, :upload)
# end
