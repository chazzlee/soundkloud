# frozen_string_literal: true

class Track < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :genre

  validates :title, presence: true
  validates :artist, presence: true
  validates :permalink, presence: true
  validates :privacy, inclusion: %w[public private]
  validates :title, presence: true
end
