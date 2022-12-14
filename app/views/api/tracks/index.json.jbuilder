# frozen_string_literal: true

tracks.each do |track|
  json.partial! 'api/tracks/track', track:
end
