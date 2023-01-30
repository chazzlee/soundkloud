# frozen_string_literal: true

json.set! track.id do
  json.extract! track, :id, :title, :artist, :privacy, :tags
  json.created_at track.updated_at
  json.permalink URI.parse(track.permalink).path
  json.cover track.cover.url
  json.upload track.upload.url
  json.genre track.genre_id
  json.uploader do
    json.id track.user.id
    json.display_name track.user.profile.display_name
    json.slug track.user.profile.slug
  end
  json.permalink URI.parse(track.permalink).path
end
