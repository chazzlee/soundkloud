# frozen_string_literal: true

json.extract! playlist, :id, :title, :privacy, :plays, :user_id
json.cover playlist.cover.url
json.tracks playlist.tracks
