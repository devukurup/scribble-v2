# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = build(:category, site: @site)
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_title
    @category.title = ""

    assert_not @category.valid?
    assert_includes @category.errors.full_messages, t("errors.blank", entity: "Title")
  end

  def test_category_should_not_be_valid_without_unique_title
    @category.save!
    test_category = @category.dup
    test_category.title = test_category.title.upcase

    assert_not test_category.valid?
    assert_includes test_category.errors.full_messages, t("errors.taken", entity: "Title")
  end

  def test_category_title_should_be_invalid_if_length_exceeds_maximum_length
    @category.title = "a" * (Category::MAX_TITLE_LENGTH + 1)

    assert_not @category.valid?
    assert_includes @category.errors.full_messages,
      t("errors.too_long", entity: "Title", maximum: Category::MAX_TITLE_LENGTH)
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[Getting\ started security\ &\ privacy new-category new-category2]
    valid_titles.each do |title|
      @category.title = title

      assert @category.valid?
    end
  end

  def test_validation_should_reject_invalid_titles
    invalid_titles = %w[1Getting\ started _security\ &\ privacy new_category new.category2]
    invalid_titles.each do |title|
      @category.title = title

      assert_not @category.valid?
      assert_includes @category.errors.full_messages, t("errors.invalid", entity: "Title")
    end
  end

  def test_category_should_not_be_valid_without_site
    @category.site = nil

    assert_not @category.valid?
    assert_includes @category.errors.full_messages, t("errors.must_exist", entity: "Site")
  end

  def test_with_published_articles_scope_should_return_categories_with_published_articles
    category_with_published_articles = create(:category, site: @site)
    category_with_draft_articles = create(:category, site: @site)

    assert_empty @site.categories.with_published_articles

    create_list(:article, 2, status: "published", category: category_with_published_articles, site: @site, user: @user)
    create_list(:article, 2, category: category_with_draft_articles, site: @site, user: @user)

    assert_equal @site.articles.published.pluck(:category_id).uniq.sort,
      @site.categories.with_published_articles.map(&:id).sort
  end

  def test_article_count_increments_by_one_on_associating_a_category
    @category.save!
    assert_nil @category.articles_count

    assert_difference("@category.reload.articles_count.to_i", 1) do
      create(:article, category: @category, site: @site, user: @user)
    end
  end

  def test_article_count_decrements_by_one_on_destroying_an_associated_article
    @category.save!
    test_article = create(:article, category: @category, user: @user, site: @site)

    assert_difference("@category.reload.articles_count", -1) do
      test_article.destroy!
    end
  end
end
