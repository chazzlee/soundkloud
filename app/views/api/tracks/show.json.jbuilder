# frozen_string_literal: true

json.extract! track, :id, :title, :artist, :privacy, :caption, :description, :created_at, :tags
json.permalink URI.parse(track.permalink).path

json.genre track.genre.label
json.uploader do
  json.id track.user_id
  json.slug track.user.profile.slug
  json.display_name track.user.profile.display_name
  json.photo track.user.profile.photo.url
end
json.upload track.upload.url
json.cover track.cover.url
json.replies track.replies.order(created_at: :desc) do |reply|
  json.id reply.id
  json.created_at reply.created_at
  json.track_id reply.track_id
  json.body reply.body
  json.user do
    json.id reply.user_id
    json.display_name reply.user.profile.display_name
    json.slug reply.user.slug
    json.photo reply.user.profile.photo.url
  end
end
