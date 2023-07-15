# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @site_headers = headers("X-Auth-Token" => @site.authentication_token)
  end

  def test_should_list_all_categories_with_atleast_one_published_article_with_valid_token
    test_articles = create_list(:article, 10, status: :published, category: @category, site: @site, user: @user)
    test_category = create(:category, site: @site)

    get(api_v1_public_categories_path, headers: @site_headers)

    assert_response :success
    assert_equal [@category.id], response_ids(response_json["categories"])
    response_json["categories"].each do |category|
      assert_equal pluck_values(test_articles, "slug"), pluck_values(category["articles"], "slug")
    end
  end

  def test_should_not_return_any_categories_when_there_are_no_published_articles_with_valid_token
    test_article = create(:article, category: @category, user: @user, site: @site)

    get(api_v1_public_categories_path, headers: @site_headers)

    assert_response :success
    assert_empty response_json["categories"]
  end

  def test_should_not_show_with_invalid_token
    get(api_v1_public_categories_path, headers:)

    assert_response :unauthorized
    assert_equal t("session.authentication_failure"), response_json["error"]
  end

  def test_should_show_categories_in_site_without_password
    @site.update!(password: nil)
    test_article_1 = create(:article, status: :published, category: @category, site: @site, user: @user)

    get(api_v1_public_categories_path, headers: @site_headers)

    assert_response :success
    assert_equal [test_article_1.category.id], response_ids(response_json["categories"])
  end
end