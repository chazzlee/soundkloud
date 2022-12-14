# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :label
      t.references :taggable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
