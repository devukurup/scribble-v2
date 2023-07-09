# frozen_string_literal: true

class AddUserToRedirection < ActiveRecord::Migration[7.0]
  def change
    add_reference :redirections, :user, foreign_key: true, type: :uuid
  end
end
