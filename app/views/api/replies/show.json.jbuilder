# frozen_string_literal: true

json.extract! reply, :id, :body
json.created_at reply.updated_at
json.user do
  json.id reply.user_id
  json.display_name reply.user.profile.display_name
  json.slug reply.user.slug
  json.photo reply.user.profile.photo.url
end
json.track reply.track_id
