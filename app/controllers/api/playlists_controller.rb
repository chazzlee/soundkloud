# frozen_string_literal: true

class Api::PlaylistsController < ApplicationController
  before_action :require_logged_in

  def index
    # FIXME: all playlists as well as user playlists
    playlists = Playlist.all
    render template: 'api/playlists/index', locals: { playlists: }
  end

  def create
    playlist = current_user.playlists.build
    playlist.title = params[:title]
    playlist.permalink = "#{request.protocol}#{request.host_with_port}/#{current_user.slug}/sets/#{params[:permalink]}"
    playlist.privacy = params[:privacy]
    playlist.track_ids = params[:tracks]

    if playlist.save
      render template: 'api/playlists/show', locals: { playlist: }
    else
      render json: { errors: playlist.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show; end

  def update
    playlist = Playlist.find(params[:id])
    track = Track.find(params[:track])
    playlist.add_track!(track) if playlist.user_id == current_user.id

    render template: 'api/playlists/show', locals: { playlist: }
  end

  def destroy
    playlist = Playlist.find(params[:id])
    if playlist.user_id == current_user.id
      playlist.destroy!
      head :no_content
    else
      render json: { message: 'Cannot perform this action.' }, status: :forbidden
    end
  end
end
