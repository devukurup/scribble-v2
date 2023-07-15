# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @redirection = build(:redirection, site: @site)
  end

  def test_redirection_should_be_valid
    assert @redirection.valid?
  end

  def test_redirection_should_not_be_valid_without_from
    @redirection.from = ""

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages,
      t("errors.blank", entity: Redirection.human_attribute_name("from"))
  end

  def test_redirection_should_not_be_valid_without_to
    @redirection.to = ""

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, t("errors.blank", entity: Redirection.human_attribute_name("to"))
  end

  def test_redirection_should_not_be_valid_without_unique_from
    @redirection.save!
    test_redirection = build(:redirection, from: @redirection.from)

    assert_not test_redirection.valid?
    assert_includes test_redirection.errors.full_messages,
      t("errors.taken", entity: Redirection.human_attribute_name("from"))
  end

  def test_redirection_to_path_should_be_invalid_if_length_exceeds_maximum_length
    @redirection.to = "a" * (Redirection::MAX_TO_LENGTH + 1)

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages,
      t("errors.too_long", maximum: Redirection::MAX_TO_LENGTH, entity: Redirection.human_attribute_name("to"))
  end

  def test_redirection_from_path_should_be_invalid_if_length_exceeds_maximum_length
    @redirection.from = "/#{"a" * (Redirection::MAX_FROM_LENGTH)}"

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages,
      t("errors.too_long", maximum: Redirection::MAX_FROM_LENGTH, entity: Redirection.human_attribute_name("from"))
  end

  def test_validation_should_accept_valid_to_paths
    valid_to_paths = ["https://neeto.com", "http://neeto.com", "https://neeto.com/a/b", "www.neeto.com", "/a/b"]

    valid_to_paths.each do |to_path|
      @redirection.to = to_path

      assert @redirection.valid?
    end
  end

  def test_validation_should_reject_invalid_to_paths
    invalid_to_paths = ["https:// neeto.com", "a/b", "a/b/c a", "5http://@neeto.com"]

    invalid_to_paths.each do |to_path|
      @redirection.to = to_path

      assert_not @redirection.valid?
      assert_includes @redirection.errors.full_messages,
        t("errors.invalid", entity: Redirection.human_attribute_name("to"))
    end
  end

  def test_validation_should_accept_valid_from_paths
    valid_from_paths = ["/articles/getting_started", "/articles/getting.started", "/a/b123_a"]

    valid_from_paths.each do |from_path|
      @redirection.from = from_path

      assert @redirection.valid?
    end
  end

  def test_validation_should_reject_invalid_from_paths
    invalid_from_paths = [ "a/b", "a/b/c a", "http://@neeto.com"]

    invalid_from_paths.each do |from_path|
      @redirection.from = from_path

      assert_not @redirection.valid?
      assert_includes @redirection.errors.full_messages,
        t("errors.invalid", entity: Redirection.human_attribute_name("from"))
    end
  end

  def test_redirection_should_not_be_valid_without_site
    @redirection.site = nil

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages,
      t("errors.must_exist", entity: Redirection.human_attribute_name("site"))
  end

  def test_redirection_should_not_be_valid_with_same_from_and_to
    @redirection.to = @redirection.from

    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages,
      t(
        "errors.identical", entity_1: Redirection.human_attribute_name("from"),
        entity_2: Redirection.human_attribute_name("to").downcase)
  end

  def test_redirection_should_not_be_valid_with_cyclic_redirection
    @redirection.save!
    test_redirection_1 = create(:redirection, from: @redirection.to, site: @site)
    test_redirection_2 = build(:redirection, from: test_redirection_1.to, to: @redirection.from, site: @site)

    assert_not test_redirection_2.valid?
    assert_includes test_redirection_2.errors.full_messages, t("errors.cyclic", entity: Redirection.model_name.human)
  end

  def test_redirection_should_be_valid_with_transitive_redirection
    @redirection.save!
    test_redirection_1 = build(:redirection, from: @redirection.to)

    assert test_redirection_1.valid?
  end

  def test_redirect_url_should_return_correct_url_format
    redirection = build(:redirection, to: "www.example.com")

    assert_equal "https://www.example.com", redirection.redirect_url
  end
end
