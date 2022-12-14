# frozen_string_literal: true

class Reply < ApplicationRecord
  belongs_to :user
  belongs_to :track

  validates :body, presence: true
end
