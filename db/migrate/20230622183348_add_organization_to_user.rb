# frozen_string_literal: true

class AddOrganizationToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :organization, foreign_key: true, null: false, type: :uuid
  end
end
