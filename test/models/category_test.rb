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
end
