# frozen_string_literal: true

class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites, id: :uuid do |t|
      t.string :title, null: false, index: { unique: true }
      t.string :password_digest

      t.timestamps
    end
  end
end
