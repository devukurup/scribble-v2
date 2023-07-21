# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    site = create(:site)
    user = create(:user, site:)
    category = create(:category, site:)
    article = create(:article, category:, user:, site:)
    @schedule = create(:schedule, article:)
  end

  def test_schedule_should_not_be_valid_without_event
    @schedule.event = ""

    assert_not @schedule.valid?
    assert_includes @schedule.errors.full_messages, t("errors.blank", entity: Schedule.human_attribute_name("event"))
  end

  def test_schedule_should_not_be_valid_without_time
    @schedule.time = nil

    assert_not @schedule.valid?
    assert_includes @schedule.errors.full_messages, t("errors.blank", entity: Schedule.human_attribute_name("time"))
  end

  def test_schedule_should_not_be_valid_without_article
    @schedule.article = nil

    assert_not @schedule.valid?
    assert_includes @schedule.errors.full_messages,
      t("errors.must_exist", entity: Schedule.human_attribute_name("article"))
  end

  def test_schedule_time_should_be_in_future
    @schedule.time = Time.zone.yesterday

    assert_not @schedule.valid?
    assert_includes @schedule.errors.full_messages, t("errors.not_future")
  end
end
