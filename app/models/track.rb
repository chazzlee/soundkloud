# frozen_string_literal: true

class Track < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :genre

  has_many :recent_plays, dependent: :destroy

  has_many :popular_plays, dependent: :destroy

  has_one_attached :cover, dependent: :destroy
  has_one_attached :upload, dependent: :destroy

  has_many :tags, as: :taggable, dependent: :destroy
  has_many :replies, dependent: :destroy

  validates :title, presence: true, uniqueness: { scope: :artist }
  validates :artist, presence: true
  validates :permalink, presence: true, allow_nil: true
  validates :privacy, inclusion: %w[public private]
end
