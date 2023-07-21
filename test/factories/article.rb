# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Lorem.word }
    body { Faker::Lorem.paragraph }
    site
    user
    category

    trait :with_schedule do
      transient do
        time { Time.zone.tomorrow }
        event { :publish }
      end

      after(:create) do |article, context|
        create :schedule, article:, event: context.event, time: context.time
      end
    end
  end
end
