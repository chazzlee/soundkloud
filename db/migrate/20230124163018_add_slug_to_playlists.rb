class AddSlugToPlaylists < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists, :slug, :string
    add_index :playlists, :slug, unique: true
  end
end
