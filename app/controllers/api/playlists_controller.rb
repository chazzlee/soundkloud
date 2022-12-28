# frozen_string_literal: true

class Api::PlaylistsController < ApplicationController
  before_action :require_logged_in

  def index
    playlists = current_user.playlists
    render template: 'api/playlists/index', locals: { playlists: }
  end

  def create
    playlist = current_user.playlists.build
    p params[:tracks]
    playlist.title = params[:title]
    playlist.privacy = params[:privacy]
    playlist.track_ids = params[:tracks]
    playlist.save!

    render template: 'api/playlists/show', locals: { playlist: }
  end

  def show; end

  def update
    playlist = Playlist.find(params[:id])
    playlist.add_track!(params[:track]) if playlist.user_id == current_user.id

    render json: { playlist: }
  end

  def destroy; end
end
