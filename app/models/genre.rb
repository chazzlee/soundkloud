# frozen_string_literal: true

class Genre < ApplicationRecord
  has_many :tracks, dependent: :destroy
  has_many :playlists, dependent: :destroy
end
