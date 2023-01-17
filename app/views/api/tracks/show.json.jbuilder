# frozen_string_literal: true

# random_tracks = [
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3',
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+Der+Stille+Fluss.mp3',
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/01.+The+Root+of+All+Evil.mp3',
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/02+-+To+Breathe+in+a+Casket.mp3',
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/04+Die+Welt+In+Mir.mp3',
#   'https://soundkloud-seeds.s3.amazonaws.com/tracks/05+-+No+Will+to+Live.mp3'
# ]

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
# json.upload random_tracks.sample
json.cover track.cover.url

unless replies.nil?
  json.replies replies&.order(created_at: :desc) do |reply|
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
end
