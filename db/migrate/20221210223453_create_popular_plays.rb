# frozen_string_literal: true

class CreatePopularPlays < ActiveRecord::Migration[7.0]
  def change
    create_table :popular_plays do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :track, null: false, foreign_key: true
      t.integer :play_count, null: false, default: 1

      t.timestamps
    end
  end
end
