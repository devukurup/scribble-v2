# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class ArticleScheduleWorkerTest < ActiveJob::TestCase
  def test_schedule_service_is_triggered
    schedule_service_mock = MiniTest::Mock.new
    schedule_service_mock.expect(:process, true)

    Articles::ScheduleService.stub :new, schedule_service_mock do
      ArticleScheduleWorker.perform_async
    end

    assert_mock schedule_service_mock
  end
end
