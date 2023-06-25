# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
  end

  def test_site_should_not_be_valid_without_title
    @site.title = ""

    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Title can't be blank"
  end

  def test_site_should_not_be_valid_without_unique_title
    test_site = @site.dup

    assert_not test_site.valid?
    assert_includes test_site.errors.full_messages, "Title has already been taken"
  end

  def test_site_title_should_be_invalid_if_length_exceeds_maximum_length
    @site.title = "a" * (Site::MAX_TITLE_LENGTH + 1)

    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Title is too long (maximum is 100 characters)"
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[New\ Spinkart security\ &\ privacy new-site new-site2]
    valid_titles.each do |title|
      @site.title = title

      assert @site.valid?
    end
  end

  def test_validation_should_reject_invalid_titles
    invalid_titles = %w[1New\ Spinkart _security\ &\ privacy new_site new_site2]
    invalid_titles.each do |title|
      @site.title = title

      assert_not @site.valid?
      assert_includes @site.errors.full_messages, "Title is invalid"
    end
  end

  def test_password_should_not_be_valid_with_invalid_length
    @site.password = "1#{ "a" * (Site::MINIMUM_PASSWORD_LENGTH - 2)}"

    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_validation_should_accept_valid_passwords
    valid_passwords = %w[1abcde ab1cde abc1de 111a11 11@2a!! 11!3a#]
    valid_passwords.each do |password|
      @site.password = password

      assert @site.valid?
    end
  end

  def test_validation_should_not_accept_invalid_passwords
    invalid_passwords = %w[123456 abcdef !abcde 12345@]
    invalid_passwords.each do |password|
      @site.password = password

      assert_not @site.valid?
      assert_includes @site.errors.full_messages, "Password is invalid"
    end
  end

  def test_site_should_have_unique_auth_token
    test_site = create(:site)

    assert_not_same @site.authentication_token, test_site.authentication_token
  end
end
