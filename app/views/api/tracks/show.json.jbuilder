# frozen_string_literal: true

json.extract! track, :id, :title, :artist, :privacy, :created_at
json.permalink URI.parse(track.permalink).path
json.uploader do
  json.id track.user_id
  json.display_name track.user.profile.display_name
end
