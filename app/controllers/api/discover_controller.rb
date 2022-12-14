# frozen_string_literal: true

class Api::DiscoverController < ApplicationController
  def index
    # TODO: find a better way...
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

    if current_user
      recently_played_tracks = current_user.recently_played_tracks.order(last_played_at: :asc).limit(16)
      most_played_tracks = current_user.most_played_tracks.order(play_count: :asc).limit(16)
    else
      recently_played_tracks = Track.offset(rand(0..20)).limit(16)
      most_played_tracks = Track.offset(rand(0..20)).limit(16)
    end

    render template: 'api/discover/index', locals: {
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
end
