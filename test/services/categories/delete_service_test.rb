# frozen_string_literal: true

require "test_helper"

class Categories::DeleteServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category, user: @user)

    @service = Categories::DeleteService.new(@user, @category)
  end

  def test_last_category_without_associated_articles_can_be_destroyed
    assert_difference "Category.count", -1 do
      service.process
    end
  end

  def test_category_with_articles_can_be_destroyed_and_articles_are_moved_to_target_category
    create_list(:article, 10, user: @user, category: @category)
    target_category = create(:category, user: @user)

    assert_difference "Category.count", -1 do
      service(target_category.id).process
    end

    assert_equal 10, target_category.articles.count
  end

  def test_last_general_category_cannot_be_destroyed
    create_list(:article, 10, user: @user, category: @category)
    @category.update!(title: "General")
    service.process

    assert @category.persisted?
  end

  def test_last_category_with_articles_can_be_destroyed_and_articles_are_moved_to_general_category
    create_list(:article, 10, user: @user, category: @category)
    service.process
    assert_equal "General", Article.first.category.title
    assert_not Category.exists?(@category.id)
  end

  private

    def service(target_category_id = nil)
      Categories::DeleteService.new(@user, @category, target_category_id)
    end
end
