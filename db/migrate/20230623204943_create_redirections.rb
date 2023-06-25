# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[7.0]
  def change
    create_table :redirections, id: :uuid do |t|
      t.text :from, null: false, index: { unique: true }
      t.text :to, null: false
      t.references :site, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
