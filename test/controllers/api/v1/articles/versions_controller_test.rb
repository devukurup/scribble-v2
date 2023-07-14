# frozen_string_literal: true

require "test_helper"

class Api::V1::Articles::VersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, user: @user, category: @category, site: @site)
  end

  def test_should_list_all_article_versions
    with_versioning do
      update_title
      @article.update(status: :published)
      get(api_v1_article_versions_path(@article.id), headers:)

      assert_response :success
      assert_equal @article.versions.pluck(:id).sort, response_ids(response_json["versions"])
    end
  end

  def test_should_show_article_version
    with_versioning do
      update_title
      latest_version = @article.versions.last

      get(api_v1_article_version_path(@article.id, latest_version.id), headers:)

      assert_response :success
      assert_equal latest_version.reify.title, response_json["version"]["title"]
    end
  end

  def test_should_restore_article_version
    with_versioning do
      title = @article.title
      update_title
      previous_version = @article.versions.first

      assert_difference -> { @article.versions.reload.size }, 1 do
        patch(restore_api_v1_article_version_path(@article.id, previous_version.id), headers:)
        assert_response :success
      end

      assert_equal title, @article.reload.title
      assert_equal t("success.restored", entity: Article.model_name.human), response_json["notice"]
    end
  end

  private

    def update_title
      @article.update!(title: "Updated title")
    end
end
