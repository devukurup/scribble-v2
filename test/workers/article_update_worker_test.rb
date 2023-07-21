# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class ArticleUpdateWorkerTest < ActiveJob::TestCase
  def test_schedule_service_is_triggered
    update_service_mock = MiniTest::Mock.new
    update_service_mock.expect(:process!, true)

    Articles::UpdateService.stub :new, update_service_mock do
      ArticleUpdateWorker.perform_async("post_id")
    end

    assert_mock update_service_mock
  end
end
