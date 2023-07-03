# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { "/#{Faker::Lorem.unique.word}" }
    to { "/#{Faker::Lorem.unique.word}" }
    site
  end
end
