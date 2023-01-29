# frozen_string_literal: true

class Playlist < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true, uniqueness: { scope: :user }
  validates :permalink, presence: true, allow_nil: true
  validates :privacy, inclusion: %w[public private]

  belongs_to :user
  has_many :playlist_tracks

  has_many :tracks,
           through: :playlist_tracks,
           source: :track

  has_one_attached :cover

  def add_track!(track)
    tracks << track
    save!
  end

  def remove_track!(track)
    tracks.destroy(track)
    save!
  end
end
