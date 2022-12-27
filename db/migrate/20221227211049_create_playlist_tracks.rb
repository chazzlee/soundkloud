class CreatePlaylistTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_tracks do |t|
      t.belongs_to :playlist, null: false, foreign_key: true
      t.belongs_to :track, null: false, foreign_key: true
      t.timestamps
    end
  end
end
