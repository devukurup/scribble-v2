# frozen_string_literal: true

require "test_helper"

class Articles::ScheduleServiceTest < ActiveSupport::TestCase
  def setup
    freeze_time
    Sidekiq::Testing.fake!

    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    create(:article, :with_schedule, category: @category, user: @user, site: @site)
end

  def test_update_worker_is_called_for_each_schedule_for_the_current_time
    time = Time.zone.now + 10.minutes
    schedule_count_at_given_time = 10
    test_articles = create_list(
      :article, schedule_count_at_given_time, :with_schedule, category: @category,
      user: @user, site: @site, time:)

    travel_to time
    Articles::ScheduleService.new.process

    assert_equal schedule_count_at_given_time, ArticleUpdateWorker.jobs.size
  end
end
