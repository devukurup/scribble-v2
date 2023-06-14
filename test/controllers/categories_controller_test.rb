# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_categories
    get categories_path, headers: headers()

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

  private

    def category_params
      {
        category: {
          title: "test_title"
        }
      }
    end
end
