# frozen_string_literal: true

class Api::TracksController < ApplicationController
  def index
    # TODO:
    render json: { track: Track.all }
  end

  def show
    profile = Profile.friendly.find(params[:profile_id])
    user = profile.user
    track = user.tracks.friendly.find(params[:id])

    render template: 'api/tracks/show', locals: { track: }
  end

  def create
    track = current_user.tracks.build
    track.title = params[:title]
    track.artist = params[:artist]
    track.permalink = params[:permalink]
    track.description = params[:description]
    track.caption = params[:caption]
    track.privacy = params[:privacy]
    track.genre_id = params[:genre_id]

    track.upload.attach(params[:upload]) if params[:upload]
    track.cover.attach(params[:cover]) if params[:cover]

    if track.save
      render template: 'api/tracks/show', locals: { track: }, status: :created
    else
      render json: { errors: track.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # TODO: keep getting unpermitted params :format
  # private
  # def track_params
  #   params
  #     .permit(:title, :artist, :permalink, :description, :caption, :privacy, :genre_id, :upload)
  #   params.permit(:format)
  # end
end
