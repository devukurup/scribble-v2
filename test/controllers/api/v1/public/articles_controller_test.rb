# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, status: :published, category: @category, site: @site, user: @user)
    @site_headers = headers("X-Auth-Token" => @site.authentication_token)
  end

  def test_should_show_with_valid_token
    get api_v1_public_article_path(@article.slug), headers: @site_headers

    assert_response :success
    assert_equal @article.title, response_json["article"]["title"]
  end

  def test_should_not_show_draft_articles_with_valid_token
    @article.update!(status: :draft)

    get api_v1_public_article_path(@article.slug), headers: @site_headers

    assert_response :not_found
  end

  def test_should_not_show_with_invalid_token
    get(api_v1_public_article_path(@article.slug), headers: headers("X-Auth-Token" => "invalid_token"))

    assert_response :unauthorized
    assert_equal t("session.could_not_auth"), response_json["error"]
  end

  def test_should_show_article_in_site_with_no_password_without_token
    @site.update!(password: nil)

    get(api_v1_public_article_path(@article.slug), headers:)

    assert_response :success
  end

  def test_search_should_list_published_articles_based_on_search_term
    test_article_1 = create(:article, status: :published, title: "Updated article", category: @category, site: @site, user: @user)
    test_article_2 = create(:article, status: :published, body: "This is an updated article", category: @category, site: @site, user: @user)
    search_term = "updated"

    get search_api_v1_public_articles_path, params: { search_term: }, headers: @site_headers

    assert_response :success
    assert_equal [test_article_1.slug, test_article_2.slug].sort, response_json["articles"].pluck("slug").sort
  end
end
