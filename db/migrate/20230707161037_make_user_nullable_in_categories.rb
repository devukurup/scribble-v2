# frozen_string_literal: true

class MakeUserNullableInCategories < ActiveRecord::Migration[7.0]
  def change
    change_column_null :categories, :user_id, true
  end
end
