# frozen_string_literal: true

class AddUserToCategory < ActiveRecord::Migration[7.0]
  def change
    add_reference :categories, :user, foreign_key: true, null: false, type: :uuid
  end
end
