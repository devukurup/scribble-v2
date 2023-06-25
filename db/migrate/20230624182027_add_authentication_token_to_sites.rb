# frozen_string_literal: true

class AddAuthenticationTokenToSites < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :authentication_token, :string
    add_index :sites, :authentication_token, unique: true
  end
end
