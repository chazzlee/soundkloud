# frozen_string_literal: true

tracks.each do |track|
  json.set! track.id do
    json.extract! track, :id, :title, :artist, :permalink, :description, :caption, :privacy
    json.genre do
      json.id track.genre_id
      json.name track.genre.name
      json.label track.genre.label
    end
    json.user do
      json.id track.user.id
      json.display_name track.user.profile.display_name
      json.email track.user.email
    end
  end
end
