# frozen_string_literal: true

class Api::DiscoverController < ApplicationController
  def index
    genres = Genre.pluck(:name)
    tracks_by_genre = genres.map do |genre_name|
      { "#{genre_name}": Genre.find_by(name: genre_name).tracks.includes({ cover_attachment: :blob }, :tags).limit(16) }
    end

    recently_played_tracks = if current_user
                               current_user
                                 .recently_played_tracks
                                 .includes({ cover_attachment: :blob }, :tags)
                                 .order(last_played_at: :asc)
                                 .limit(16)
                             else
                               Track.includes({ cover_attachment: :blob }, :tags).offset(rand(0..20)).limit(16)
                             end
    most_played_tracks = if current_user
                           current_user
                             .most_played_tracks
                             .includes({ cover_attachment: :blob }, :tags)
                             .order(play_count: :asc)
                             .limit(16)
                         else
                           Track.includes({ cover_attachment: :blob }, :tags).offset(rand(0..20)).limit(16)
                         end

    render template: 'api/discover/index', locals: { tracks_by_genre:, recently_played_tracks:, most_played_tracks: }
  end
end
