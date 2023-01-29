# frozen_string_literal: true

class Playlist < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  validates :title, presence: true, uniqueness: { scope: :user }
  validates :permalink, presence: true, allow_nil: true
  validates :privacy, inclusion: %w[public private]

  belongs_to :user
  belongs_to :genre, default: -> { Genre.first }

  has_many :playlist_tracks, dependent: :destroy

  has_many :tracks,
           through: :playlist_tracks,
           source: :track,
           dependent: :destroy

  has_one_attached :cover, dependent: :destroy

  def add_track!(track)
    tracks << track
    save!
  end

  def remove_track!(track)
    tracks.destroy(track)
    save!
  end
end
