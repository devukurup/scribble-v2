# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles, id: :uuid do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :slug, null: false, index: { unique: true }
      t.datetime :last_published_at
      t.string :status, null: false, default: "draft"
      t.references :category, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
