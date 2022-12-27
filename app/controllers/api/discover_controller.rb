# frozen_string_literal: true

class Api::DiscoverController < ApplicationController
  def index
    genres = Genre.pluck(:name)
    tracks_by_genre = genres.map do |genre_name|
      { "#{genre_name}": Genre.find_by(name: genre_name).tracks.limit(16) }
    end

    recently_played_tracks = if current_user
                               current_user
                                 .recently_played_tracks
                                 .order(last_played_at: :asc)
                                 .limit(16)
                             else
                               Track.offset(rand(0..20)).limit(16)
                             end
    most_played_tracks = if current_user
                           current_user
                             .most_played_tracks
                             .order(play_count: :asc)
                             .limit(16)
                         else
                           Track.offset(rand(0..20)).limit(16)
                         end

    render template: 'api/discover/index', locals: { tracks_by_genre:, recently_played_tracks:, most_played_tracks: }
  end

  # def index
  #   if current_user
  #     recently_played_tracks = current_user.recently_played_tracks.order(last_played_at: :asc).limit(16)
  #     most_played_tracks = current_user.most_played_tracks.order(play_count: :asc).limit(16)
  #   else
  #     recently_played_tracks = Track.offset(rand(0..20)).limit(16)
  #     most_played_tracks = Track.offset(rand(0..20)).limit(16)
  #   end

  #   render template: 'api/discover/index', locals: {
  #     recently_played_tracks:,
  #     most_played_tracks:,
  #     metal_tracks:,
  #     pop_tracks:,
  #     rnb_tracks:,
  #     techno_tracks:,
  #     classical_tracks:,
  #     ambient_tracks:,
  #     deep_house_tracks:,
  #     dubstep_tracks:,
  #     trance_tracks:,
  #     trap_tracks:,
  #     piano_tracks:,
  #     dance_edm_tracks:,
  #     drum_n_bass_tracks:
  #   }
  # end
end
