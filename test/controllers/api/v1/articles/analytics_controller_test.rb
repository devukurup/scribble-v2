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
    get(api_v1_articles_analytics_path, params: { page: 1, limit: 10, order: "asc" }, headers:)

    assert_response :success
    assert_equal @site.articles.published.pluck(:visit_count).sort, response_json["articles"].pluck("visit_count")
  end
end
