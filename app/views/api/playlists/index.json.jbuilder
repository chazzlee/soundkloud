# frozen_string_literal: true

playlists.each do |playlist|
  json.set! playlist.id do
    json.extract! playlist, :id, :title, :privacy, :plays, :user_id
    json.cover playlist.cover.url
    json.tracks playlist.tracks do |track|
      json.id track.id
      json.title track.title
      json.artist track.artist
      json.permalink track.permalink
      json.upload track.upload.url
      json.cover track.cover.url
      json.uploader do
        json.id track.user_id
        json.slug track.user.profile.slug
        json.display_name track.user.profile.display_name
      end
    end
  end
end
