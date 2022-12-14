# frozen_string_literal: true

class CreateReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :replies do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :track, null: false, foreign_key: true
      t.timestamps
    end
  end
end
