class Genre < ApplicationRecord
  has_many :tracks, dependent: :destroy
end
