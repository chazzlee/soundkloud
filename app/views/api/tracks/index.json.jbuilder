tracks.each do |track|
  json.partial! 'api/tracks/track', track:
end