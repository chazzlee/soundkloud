# frozen_string_literal: true

class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.string :permalink, null: false
      t.string :privacy, null: false, default: 'public'
      t.text :description, null: true
      t.datetime :release_date, null: true
      t.integer :plays, null: false, default: 0
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :genre, null: true, foreign_key: true

      t.timestamps
    end
  end
end
