# frozen_string_literal: true

class PlaylistTrack < ApplicationRecord
  belongs_to :playlist
  belongs_to :track

  validates :playlist_id, uniqueness: { scope: :track_id }
end
