# frozen_string_literal: true

class PlaylistTrack < ApplicationRecord
  belongs_to :playlist
  belongs_to :track
end
