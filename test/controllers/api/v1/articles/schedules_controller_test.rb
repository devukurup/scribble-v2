# frozen_string_literal: true

require "test_helper"

class Api::V1::Articles::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    site = create(:site)
    user = create(:user, site:)
    category = create(:category, site:)
    @article = create(:article, category:, user:, site:)
    @schedule = create(:schedule, article: @article)
  end

  def test_should_show_article_schedule
    get(api_v1_article_schedule_path(@article.id), headers:)

    assert_response :success
    assert_equal @schedule.event, response_json["schedule"]["event"]
  end

  def test_should_create_article_schedule
    params = {
      schedule: {
        time: Time.zone.tomorrow,
        event: :publish
      }
    }
    post(api_v1_article_schedule_path(@article.id), params:, headers:)

    assert_response :success
    assert_equal t("success.created", entity: Schedule.model_name.human), response_json["notice"]
  end
end
