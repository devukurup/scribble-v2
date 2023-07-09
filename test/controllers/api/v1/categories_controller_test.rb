# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @category = create(:category, site: @site)
  end

  def test_should_list_all_categories
    get(api_v1_categories_path, params: search_params, headers:)

    assert_response :success
    assert_equal @site.categories.pluck(:id).sort, response_ids(response_json["categories"])
    assert_equal @site.categories.size, response_json["categories_count"]
  end

  def test_search_term_should_filter_categories
    test_category = create(:category, site: @site)
    get(api_v1_categories_path, params: search_params(test_category.title), headers:)

    assert_response :success
    assert_equal test_category.id, response_json["categories"][0]["id"]
  end

  def test_should_create_valid_category
    post(api_v1_categories_path, params: category_params, headers:)

    assert_response :success
    assert_equal category_params[:category][:title], response_json["category"]["title"]
    assert_equal t("success.created", entity: Category.model_name.human), response_json["notice"]
  end

  def test_should_update_category
    put(api_v1_category_path(@category.id), params: category_params, headers:)

    assert_response :success
    assert_equal category_params[:category][:title], @category.reload.title
    assert_equal t("success.updated", entity: Category.model_name.human), response_json["notice"]
  end

  def test_should_reoder_category_positions
    category_2 = create(:category, site: @site)

    assert_equal 1, @category.position

    put(api_v1_category_path(category_2.id), params: position_params, headers:)

    assert_response :success
    assert_equal 2, @category.reload.position
  end

  def test_should_destroy_category_on_delete_service_success
    delete(api_v1_category_path(@category.id), headers:)

    assert_response :success
    assert_equal t("success.deleted", entity: Category.model_name.human), response_json["notice"]
  end

  def test_should_not_destroy_category_on_delete_service_serror
    delete(api_v1_category_path("unknown id"), headers:)

    assert_response :not_found
  end

  private

    def category_params
      {
        category: {
          title: "test title"
        }
      }
    end

    def search_params(search_term = "")
      {
        search_term:
      }
    end

    def position_params
      {
        category: {
          position: 1
        },
        quiet: true
      }
    end
end
