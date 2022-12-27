# frozen_string_literal: true

tracks_by_genre.each do |genre|
  genre_key = genre.keys[0]

  json.set! genre_key do
    genre[genre_key].each do |track|
      next if %w[none custom].include?(genre_key)

      json.partial! 'api/discover/discover', track:
    end
  end
end

json.recently_played do
  recently_played_tracks.each do |track|
    json.partial! 'api/discover/discover', track:
  end
end

json.most_played do
  most_played_tracks.each do |track|
    json.partial! 'api/discover/discover', track:
  end
end
