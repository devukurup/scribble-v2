# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    title { Faker::Lorem.unique.sentence(word_count: 2) }
    user
  end
end
