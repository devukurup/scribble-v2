# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    time { Time.zone.now + 1.day }
    event { :publish }
    article
  end
end
