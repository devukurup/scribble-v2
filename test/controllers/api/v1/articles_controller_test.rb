# frozen_string_literal: true

require "test_helper"

class Api::V1::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, category: @category)
  end

  def test_should_list_all_articles
    get(api_v1_articles_path, headers:)

    assert_response :success
    assert Article.count, response_json["articles"].count
  end

  def test_should_create_valid_article
    post(api_v1_articles_path, params: article_params("Test article"), headers:)

    assert_response :success
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_should_not_create_article_without_title
    post(api_v1_articles_path, params: article_params(""), headers:)

    assert_response :unprocessable_entity
    assert_equal "Title can't be blank, Title is invalid, Slug can't be blank", response_json["error"]
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete(api_v1_article_path(@article.id), headers:)
    end

    assert_response :ok
  end

  def test_should_update_article
    put(api_v1_article_path(@article.id), params: article_params("updated title"), headers:)

    assert_response :success
    assert_equal "updated title", @article.reload.title
  end

  def test_should_show_article
    get(api_v1_article_path(@article.id), headers:)

    assert_response :success
    assert_equal @article.title, response_json["article"]["title"]
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
