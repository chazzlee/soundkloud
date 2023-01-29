# frozen_string_literal: true

json.extract! playlist, :id, :title, :privacy, :plays, :slug
json.created_at playlist.updated_at
json.cover playlist.cover.url
json.description playlist.description
json.genre playlist.genre_id
json.release_date playlist.release_date
json.permalink URI.parse(playlist.permalink).path
json.uploader do
  json.id playlist.user_id
  json.slug playlist.user.slug
  json.display_name playlist.user.profile.display_name
  json.photo playlist.user.profile.photo.url
end
json.tracks playlist.tracks do |track|
  json.id track.id
  json.title track.title
  json.artist track.artist
  json.permalink URI.parse(track.permalink).path
  json.upload track.upload.url
  json.cover track.cover.url
  json.uploader do
    json.id track.user_id
    json.slug track.user.profile.slug
    json.display_name track.user.profile.display_name
  end
end
