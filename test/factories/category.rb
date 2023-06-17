# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Lorem.unique.word }
    user
  end
end
