# frozen_string_literal: true

class Api::PlaylistTracksController < ApplicationController
  def create
    playlist = Playlist.find(params[:playlist_id])
    track = Track.find(params[:track])
    playlist.add_track!(track) if playlist.user_id == current_user.id

    render template: 'api/playlists/show', locals: { playlist: }
  end

  def destroy
    track = Track.find(params[:id])
    playlist = Playlist.find(params[:playlist_id])
    playlist.remove_track!(track)

    head :no_content
  end
end
