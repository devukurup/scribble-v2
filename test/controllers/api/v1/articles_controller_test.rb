# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, user: @user, category: @category, site: @site)
  end

  def test_should_list_all_articles
    create_list(:article, 10, user: @user, category: @category, site: @site, status: :published)
    params = { status: :published, page: 1, limit: 10, category_ids: [@category.id] }
    articles = @site.articles

    get(api_v1_articles_path, params:, headers:)

    assert_response :success
    assert articles.published.pluck(:id).sort, response_ids(response_json["articles"])
    assert_equal articles.published.size, response_json["filtered_articles_count"]
    assert_equal articles.size, response_json["all_articles_count"]
    assert_equal articles.published.size, response_json["published_articles_count"]
    assert_equal articles.draft.size, response_json["draft_articles_count"]
  end

  def test_should_show_article
    get(api_v1_article_path(@article.id), headers:)

    assert_response :success
    assert_equal @article.id, response_json["article"]["id"]
  end

  def test_error_response_on_invalid_article_id
    get(api_v1_article_path(-1), headers:)

    assert_response :not_found
  end

  def test_should_update_article
    params = { article: { title: "updated title" } }
    put(api_v1_article_path(@article.id), params:, headers:)

    assert_response :success
    assert_equal params.dig(:article, :title), @article.reload.title
    assert_equal t("success.updated", entity: Article.model_name.human), response_json["notice"]
  end

  def test_error_response_on_invalid_parameters
    params = { article: { title: "" } }
    put(api_v1_article_path(@article.id), params:, headers:)

    assert_response :unprocessable_entity
  end

  def test_should_create_article
    post(api_v1_articles_path, params: article_params("Test article"), headers:)

    assert_response :success
    assert_equal t("success.created", entity: Article.model_name.human), response_json["notice"]
  end

  def test_should_destroy_article
    assert_difference "@site.articles.count", -1 do
      delete(api_v1_article_path(@article.id), headers:)
    end

    assert_response :success
    assert_equal t("success.deleted", entity: Article.model_name.human), response_json["notice"]
  end

  def test_should_bulk_destroy_articles
    article_ids = create_list(:article, 5, user: @user, site: @site, status: :published).pluck(:id)

    delete(bulk_destroy_api_v1_articles_path, params: { article_ids: }, headers:)

    assert_response :success
    assert_equal t("articles.success.deleted", count: article_ids.size), response_json["notice"]
  end

  def test_bulk_update_success_on_valid_params
    article_ids = create_list(:article, 5, user: @user, site: @site, category: @category).pluck(:id)
    params = {
      status: :published,
      article_ids:
    }

    patch(bulk_update_api_v1_articles_path, params:, headers:)

    assert_response :success
    assert_equal article_ids.size, @site.articles.reload.published.size
    assert_equal t("articles.success.updated", count: article_ids.size), response_json["notice"]
  end

  def test_bulk_update_error_response_on_service_errors
    article_ids = [@article.id]
    params = {
      status: :draft,
      category_id: "invalid_id",
      article_ids:
    }

    patch(bulk_update_api_v1_articles_path, params:, headers:)

    assert_response :unprocessable_entity
  end

  private

    def article_params(title = "")
      {
        article: {
          title:,
          body: "Test article body",
          user: @user,
          category_id: @category.id
        }
      }
    end
end
