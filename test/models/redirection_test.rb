# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = build(:redirection)
  end

  def test_valid
    assert @redirection.valid?
  end

  def test_redirection_should_not_be_valid_without_from
    @redirection.from = ""

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From can't be blank"
  end

  def test_redirection_should_not_be_valid_without_to
    @redirection.to = ""

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To can't be blank"
  end

  def test_redirection_should_not_be_valid_with_duplicate_from
    @redirection.save!
    test_redirection = build(:redirection, from: @redirection.from)

    assert_not test_redirection.valid?
    assert_includes test_redirection.errors.full_messages, "From has already been taken"
  end

  def test_redirection_should_not_be_valid_with_same_from_and_to
    @redirection.to = @redirection.from

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From and to values are identical"
  end

  def test_redirection_should_not_be_valid_with_cyclic_redirection
    @redirection.save!
    test_redirection_1 = create(:redirection, from: @redirection.to)
    test_redirection_2 = build(:redirection, from: test_redirection_1.to, to: @redirection.from)

    assert_not test_redirection_2.valid?
    assert_includes test_redirection_2.errors.full_messages, "Redirection forms a cycle, Try with different values"
  end

  def test_redirection_should_be_valid_with_transitive_redirection
    @redirection.save!
    test_redirection_1 = build(:redirection, from: @redirection.to)

    assert test_redirection_1.valid?
  end
end
