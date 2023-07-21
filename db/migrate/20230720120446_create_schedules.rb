# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules, id: :uuid do |t|
      t.datetime :time, null: false
      t.string :event, null: false
      t.references :article, null: false, foreign_key: { on_delete: :cascade }, type: :uuid

      t.timestamps
    end
  end
end
