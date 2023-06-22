# frozen_string_literal: true

FactoryBot.define do
    factory :site do
      title { Faker::Lorem.unique.word }
    end
  end
