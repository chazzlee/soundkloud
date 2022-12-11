# frozen_string_literal: true

class CreateRecentPlays < ActiveRecord::Migration[7.0]
  def change
    create_table :recent_plays do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :track, null: false, foreign_key: true
      t.datetime :last_played_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }

      t.timestamps
    end
  end
end
