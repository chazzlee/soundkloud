# frozen_string_literal: true

json.set! track.id do
  json.extract! track, :id, :title, :artist, :privacy, :tags
  json.permalink URI.parse(track.permalink).path
end
