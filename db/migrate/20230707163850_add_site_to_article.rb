# frozen_string_literal: true

class AddSiteToArticle < ActiveRecord::Migration[7.0]
  def change
    add_reference :articles, :site, null: false, foreign_key: { on_delete: :cascade }, type: :uuid
  end
end
