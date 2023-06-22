# frozen_string_literal: true

class CreateOrganization < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :password_digest

      t.timestamps
    end
  end
end
