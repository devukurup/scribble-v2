# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, user: @user)
    @article = create(:article, status: "published", category: @category, user: @user)
    @site_headers = headers({"X-Auth-Token" => @site.authentication_token})
  end

    def test_should_show_published_article
      get api_v1_public_article_path(@article.slug), headers: @site_headers

      assert_response :success
      assert_equal @article.title, response_json["article"]["title"]
    end

  end