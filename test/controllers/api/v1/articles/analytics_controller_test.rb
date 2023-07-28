# frozen_string_literal: true

require "test_helper"

class Api::V1::Articles::AnalyticsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, status: :published, user: @user, category: @category, site: @site)
    @site_headers = headers("X-Auth-Token" => @site.authentication_token)
  end

  def test_should_list_all_published_articles
    get api_v1_public_article_path(@article.slug), headers: @site_headers
    test_article_1 = create(:article, status: :published, user: @user, category: @category, site: @site)
    2.times do
      get api_v1_public_article_path(test_article_1.slug), headers: @site_headers
    end
    get(api_v1_analytics_path, params: { page: 1, limit: 10, order: "asc" }, headers:)

    assert_response :success
    assert_equal @site.articles.published.pluck(:visit_count).sort, response_json["articles"].pluck("visit_count")
  end

  def test_should_generate_pdf
    Sidekiq::Testing.fake!

    assert_difference "GenerateReportPdfWorker.jobs.size", 1 do
      post(generate_pdf_api_v1_analytics_path, headers:)
    end

    assert_response :success
  end

  def test_should_return_error_if_report_not_attached
    get(download_pdf_api_v1_analytics_path, headers:)

    assert_response :not_found
  end

  def test_should_download_pdf
    post(generate_pdf_api_v1_analytics_path, headers:)

    get(download_pdf_api_v1_analytics_path, headers:)

    assert_response :success
    assert_equal "application/pdf", response["Content-Type"]
  end
end
