# frozen_string_literal: true

require "test_helper"

class Categories::DeleteServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
  end

  def test_category_without_associated_articles_can_be_destroyed
    service = Categories::DeleteService.new(@site, @category)

    assert_difference "@site.categories.count", -1 do
      service.process!
    end
    assert service.success?
  end

  def test_category_with_articles_can_be_destroyed_and_articles_are_moved_to_target_category
    test_articles = create_list(:article, 10, site: @site, category: @category, user: @user)
    target_category = create(:category, site: @site)
    service = Categories::DeleteService.new(@site, @category, target_category.id)

    assert_difference "@site.categories.count", -1 do
      service.process!
    end
    assert_equal test_articles.pluck(:id).sort, target_category.articles.pluck(:id).sort
    assert service.success?
  end

  def test_last_category_with_articles_can_be_destroyed_and_articles_are_moved_to_general_category
    test_articles = create_list(:article, 10, site: @site, category: @category, user: @user)
    service = Categories::DeleteService.new(@site, @category)
    service.process!

    assert_equal Category::GENERAL_CATEGORY_TITLE, test_articles.first.reload.category.title
    assert_not @category.persisted?
    assert service.success?
  end

  def test_should_not_destroy_non_general_category_without_target_category
    test_category = create(:category, site: @site)
    test_articles = create_list(:article, 10, site: @site, category: test_category, user: @user)
    service = Categories::DeleteService.new(@site, test_category)

    assert_no_difference "@site.categories.count" do
      service.process!
    end

    assert test_category.persisted?
    assert_not service.success?
    assert_includes service.errors, t("errors.category.missing_target_category")
  end

  def test_last_general_category_with_articles_cannot_be_destroyed
    create_list(:article, 10, site: @site, category: @category, user: @user)
    @category.update!(title: Category::GENERAL_CATEGORY_TITLE)
    service = Categories::DeleteService.new(@site, @category)

    assert_no_difference "@site.categories.count" do
      service.process!
    end
    assert @category.persisted?
    assert_not service.success?
    assert_includes service.errors, t("errors.category.last_general_category")
  end
end
