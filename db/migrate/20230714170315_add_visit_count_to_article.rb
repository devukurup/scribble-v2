# frozen_string_literal: true

class AddVisitCountToArticle < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :visit_count, :integer, null: false, default: 0
  end
end
