json.set! reply.id do
  json.extract! reply, :id, :body
  json.user do
    json.id reply.user_id
    json.display_name reply.user.profile.display_name
    json.slug reply.user.slug
  end
  json.track_id reply.track_id
end
