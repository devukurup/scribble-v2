# frozen_string_literal: true

class Schedule < ApplicationRecord
  enum :event, { publish: "publish", unpublish: "unpublish" }

  belongs_to :article

  validates_presence_of :event, :time
  validate :time_in_future

  private

    def time_in_future
      errors.add(:time, t("errors.schedule.not_future")) if time && time <= Time.zone.now
    end
end
