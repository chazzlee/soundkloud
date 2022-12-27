# frozen_string_literal: true

class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlist_tracks

  has_many :tracks,
           through: :playlist_tracks,
           source: :track

  def add_track!(track)
    tracks << track
    save!
  end
end
