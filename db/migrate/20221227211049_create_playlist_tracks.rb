# frozen_string_literal: true

class CreatePlaylistTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_tracks do |t|
      t.bigint :playlist_id, null: false, foreign_key: true
      t.bigint :track_id, null: false, foreign_key: true
      t.index %i[playlist_id track_id], unique: true

      t.timestamps
    end
  end
end
