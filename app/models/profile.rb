# frozen_string_literal: true

class Profile < ApplicationRecord
  extend FriendlyId
  friendly_id :display_name, use: :slugged

  belongs_to :user

  validates :display_name, presence: true, uniqueness: true
  validates :age, numericality: { only_integer: true }
  validates :gender, presence: true # TODO: (enum 4 choices --male,female,custom,none)

  has_one_attached :photo
end
