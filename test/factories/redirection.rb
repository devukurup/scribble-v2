# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { Faker::Lorem.unique.word }
    to { Faker::Internet.url }
    site
  end
end
