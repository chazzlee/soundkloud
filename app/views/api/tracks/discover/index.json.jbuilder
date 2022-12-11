# frozen_string_literal: true

json.recently_played do
  recently_played_tracks.each do |track|
    json.partial! 'api/tracks/discover/discover', track:
  end
end
json.most_played do
  most_played_tracks.each do |track|
    json.partial! 'api/tracks/discover/discover', track:
  end
end

json.by_genre do
  json.metal do
    metal_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.pop do
    pop_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.rnb do
    rnb_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.techno do
    techno_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.classical do
    classical_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.ambient do
    ambient_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.deep_house do
    deep_house_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.dubstep do
    dubstep_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.trance do
    trance_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.trap do
    trap_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.piano do
    piano_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.dance_edm do
    dance_edm_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
  json.drum_n_bass do
    drum_n_bass_tracks.each do |track|
      json.partial! 'api/tracks/discover/discover', track:
    end
  end
end
