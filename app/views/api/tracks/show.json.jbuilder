# frozen_string_literal: true

json.extract! track, :id, :title, :artist, :privacy, :caption, :description, :created_at
json.permalink URI.parse(track.permalink).path
json.cover track.cover.url
json.uploader do
  json.id track.user_id
  json.slug track.user.profile.slug
  json.display_name track.user.profile.display_name
end
