# frozen_string_literal: true

class Api::TracksController < ApplicationController
  def index
    recently_played_tracks = current_user.recently_played_tracks.order(last_played_at: :asc).limit(16)
    most_played_tracks = current_user.most_played_tracks.order(play_count: :asc).limit(16)

    metal_tracks = Genre.find_by(name: 'metal').tracks.limit(16)
    pop_tracks = Genre.find_by(name: 'pop').tracks.limit(16)
    rnb_tracks = Genre.find_by(name: 'r&b').tracks.limit(16)
    techno_tracks = Genre.find_by(name: 'techno').tracks.limit(16)
    classical_tracks = Genre.find_by(name: 'classical').tracks.limit(16)
    ambient_tracks = Genre.find_by(name: 'ambient').tracks.limit(16)
    deep_house_tracks = Genre.find_by(name: 'deep_house').tracks.limit(16)
    dubstep_tracks = Genre.find_by(name: 'dubstep').tracks.limit(16)
    trance_tracks = Genre.find_by(name: 'trance').tracks.limit(16)
    trap_tracks = Genre.find_by(name: 'trap').tracks.limit(16)
    piano_tracks = Genre.find_by(name: 'piano').tracks.limit(16)
    dance_edm_tracks = Genre.find_by(name: 'dance_edm').tracks.limit(16)
    drum_n_bass_tracks = Genre.find_by(name: 'drum_n_bass').tracks.limit(16)

    render template: 'api/tracks/discover/index', locals: {
      recently_played_tracks:,
      most_played_tracks:,
      metal_tracks:,
      pop_tracks:,
      rnb_tracks:,
      techno_tracks:,
      classical_tracks:,
      ambient_tracks:,
      deep_house_tracks:,
      dubstep_tracks:,
      trance_tracks:,
      trap_tracks:,
      piano_tracks:,
      dance_edm_tracks:,
      drum_n_bass_tracks:
    }
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
