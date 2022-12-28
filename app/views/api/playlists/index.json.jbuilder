# frozen_string_literal: true

playlists.each do |playlist|
  json.set! playlist.id do
    json.extract! playlist, :id, :title, :privacy, :plays, :user_id
    json.cover playlist.cover.url
    json.tracks playlist.tracks
  end
end
