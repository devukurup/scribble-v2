# frozen_string_literal: true

class RemoveUserFromCategoriesAndRedirections < ActiveRecord::Migration[7.0]
  def change
    remove_reference :categories, :user, index: true, foreign_key: true, type: :uuid
    remove_reference :redirections, :user, index: true, foreign_key: true, type: :uuid
  end
end
