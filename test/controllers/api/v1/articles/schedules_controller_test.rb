# frozen_string_literal: true

require "test_helper"

class Api::V1::Articles::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, category: @category, user: @user, site: @site)
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

  def test_show_can_return_nil_on_empty_article_schedule
    test_article = create(:article, category: @category, user: @user, site: @site)

    get(api_v1_article_schedule_path(test_article.id), headers:)

    assert_response :success
    assert_nil response_json["schedule"]
  end

  def test_should_destroy_schedule
    delete(api_v1_article_schedule_path(@article.id), headers:)

    assert_response :success
    assert_nil @article.reload.schedule
    assert_equal t("success.deleted", entity: Schedule.model_name.human), response_json["notice"]
  end
end
