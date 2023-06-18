# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category, user: @user)
  end

  def test_should_list_all_categories
    get categories_path, headers: headers(), params: search_params

    assert_response :success
    assert Category.count, response_json["categories"].count
  end

  def test_should_create_valid_category
    post categories_path, params: category_params, headers: headers()

    assert_response :success
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_should_update_category
    put category_path(@category.id), params: category_params, headers: headers()

    assert_response :success
    assert_equal @category.reload.title, category_params[:category][:title]
  end

  def test_search_term_should_filter_categories
    test_category = create(:category, user: @user)
    get categories_path, headers: headers(), params: search_params(test_category.title)

    assert_response :success
    assert 1, response_json["categories"].count
  end

  def test_should_reoder_category_positions
    category_2 = create(:category, user: @user)
    put category_path(category_2.id), params: position_params, headers: headers()

    assert_response :success
    assert 2, @category.reload.position
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
        }
      }
    end
end
