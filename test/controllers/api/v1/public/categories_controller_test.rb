# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @site_headers = headers("X-Auth-Token" => @site.authentication_token)
  end

  def test_should_list_all_categories_with_atleast_one_published_article
    test_article_1 = create(:article, status: :published, category: @category, site: @site, user: @user)
    test_article_2 = create(:article, category: @category, user: @user, site: @site)
    test_category_1 = create(:category, site: @site)

    get(api_v1_public_categories_path, headers: @site_headers)
    response_category_ids = response_json["categories"].map { |category| category["id"] }

    assert_response :success
    assert_equal [test_article_1.category.id], response_category_ids
  end

  def test_should_not_return_any_categories_when_there_are_no_published_articles
    test_article = create(:article, category: @category, user: @user, site: @site)

    get(api_v1_public_categories_path, headers: @site_headers)

    assert_response :success
    assert_empty response_json["categories"]
  end
end