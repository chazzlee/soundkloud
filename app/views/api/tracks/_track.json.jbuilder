# frozen_string_literal: true

json.set! track.id do
  json.extract! track, :id, :title, :artist, :privacy, :tags, :created_at
  json.permalink URI.parse(track.permalink).path
  json.cover track.cover.url
  json.upload Rails.env.development? ? 'http://localhost:5000/tracks/saint-phase2.mp3' : 'https://soundkloud-rails.onrender.com/tracks/saint-phase3.mp3'
  json.genre track.genre_id
  json.uploader do
    json.id track.user.id
    json.display_name track.user.profile.display_name
    json.slug track.user.profile.slug
  end
  json.permalink URI.parse(track.permalink).path
end
