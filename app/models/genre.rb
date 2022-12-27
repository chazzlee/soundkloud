# frozen_string_literal: true

class Genre < ApplicationRecord
  has_many :tracks, dependent: :destroy
end
