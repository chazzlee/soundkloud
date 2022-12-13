# frozen_string_literal: true

class Track < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :genre

  # FIXME:
  has_many :recent_plays
  # has_many :recently_played_by_user, through: :recent_plays, source: :user

  has_many :popular_plays
  # has_many :most_played_by_user, through: :popular_plays, source: :user

  has_one_attached :cover
  has_one_attached :upload

  validates :title, presence: true
  validates :artist, presence: true
  validates :permalink, presence: true, allow_nil: true
  validates :privacy, inclusion: %w[public private]
  validates :title, presence: true
end
