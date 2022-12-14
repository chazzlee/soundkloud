json.set! track.id do
  json.extract! track, :id, :title, :artist, :privacy, :tags
  json.permalink URI.parse(track.permalink).path
  json.cover track.cover.url
  json.permalink URI.parse(track.permalink).path
end
