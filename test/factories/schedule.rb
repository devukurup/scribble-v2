# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    time { Time.zone.tomorrow }
    event { :publish }
    article
  end
end
