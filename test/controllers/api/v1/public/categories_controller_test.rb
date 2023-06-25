# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @site_headers = headers({"X-Auth-Token" => @site.authentication_token})
  end

    def test_should_list_all_categories_with_atleast_one_published_article
      test_article_1 = create(:article, status: "published", category: @category, user: @user)
      test_article_2 = create(:article, category: @category, user: @user)
      test_category_1 = create(:category, user: @user)

      get api_v1_public_categories_path, headers: @site_headers

      assert_equal test_article_1.category.title, response_json["categories"].first["title"]

    end

  end