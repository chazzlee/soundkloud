# frozen_string_literal: true

class Api::PlaylistTracksController < ApplicationController
  def destroy
    track = Track.find(params[:id])
    playlist = Playlist.find(params[:playlist_id])
    playlist.remove_track!(track)

    head :no_content
  end
end
