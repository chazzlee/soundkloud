# frozen_string_literal: true

random_tracks = [
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+-+Ad+Infinitum.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01+Der+Stille+Fluss.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/01.+The+Root+of+All+Evil.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/02+-+To+Breathe+in+a+Casket.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/04+Die+Welt+In+Mir.mp3',
  'https://soundkloud-seeds.s3.amazonaws.com/tracks/05+-+No+Will+to+Live.mp3'
]

json.set! track.id do
  json.extract! track, :id, :title, :artist, :privacy, :tags, :created_at
  json.permalink URI.parse(track.permalink).path
  json.cover track.cover.url
  # json.upload track.upload.url
  json.upload random_tracks.sample

  json.genre track.genre_id
  json.uploader do
    json.id track.user.id
    json.display_name track.user.profile.display_name
    json.slug track.user.profile.slug
  end
  json.permalink URI.parse(track.permalink).path
end
