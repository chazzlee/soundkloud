# frozen_string_literal: true

class Api::TracksController < ApplicationController
  def index
    tracks = current_user.tracks.limit(16)
    render tempalte: 'api/tracks/index', locals: { tracks: }
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

  # TODO: keep getting unpermitted params :format
  # private
  # def track_params
  #   params
  #     .permit(:title, :artist, :permalink, :description, :caption, :privacy, :genre_id, :upload)
  #   params.permit(:format)
  # end
end
