# frozen_string_literal: true

class PopularPlay < ApplicationRecord
  belongs_to :user
  belongs_to :track
end
