# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_without_title
    @category.title = ""

    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Title can't be blank"
  end

  def test_category_should_not_be_valid_without_unique_title
    @category.save!
    test_category = @category.dup

    assert_not test_category.valid?
    assert_includes test_category.errors.full_messages, "Title has already been taken"
  end

  def test_category_title_should_be_invalid_if_length_exceeds_maximum_length
    @category.title = "a" * (Category::MAX_TITLE_LENGTH + 1)

    assert_not @category.valid?
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
      assert_includes @category.errors.full_messages, "Title is invalid"
    end
  end

  def test_article_count_increments_by_one_on_associating_a_category
    @category.save!
    assert_nil @category.articles_count

    test_article = create(:article, category: @category)
    assert_equal @category.articles.count, @category.articles_count
  end
end
