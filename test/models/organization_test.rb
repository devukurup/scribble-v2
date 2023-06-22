# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_organization_should_not_be_valid_without_name
    @organization.name = ""

    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_organization_should_not_be_valid_without_unique_name
    test_organization = @organization.dup

    assert_not test_organization.valid?
    assert_includes test_organization.errors.full_messages, "Name has already been taken"
  end

  def test_organization_name_should_be_invalid_if_length_exceeds_maximum_length
    @organization.name = "a" * (Organization::MAX_NAME_LENGTH + 1)

    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name is too long (maximum is 100 characters)"
  end

  def test_validation_should_accept_valid_names
    valid_names = %w[New\ Spinkart security\ &\ privacy new-organization new-organization2]
    valid_names.each do |name|
      @organization.name = name

      assert @organization.valid?
    end
  end

  def test_validation_should_reject_invalid_names
    invalid_names = %w[1New\ Spinkart _security\ &\ privacy new_organization new_organization2]
    invalid_names.each do |name|
      @organization.name = name

      assert_not @organization.valid?
      assert_includes @organization.errors.full_messages, "Name is invalid"
    end
  end

  def test_password_should_not_be_valid_with_invalid_length
    @organization.password = "1#{ "a" * (Organization::MINIMUM_PASSWORD_LENGTH - 2)}"

    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_validation_should_accept_valid_passwords
    valid_passwords = %w[1abcde ab1cde abc1de 111a11 11@2a!! 11!3a#]
    valid_passwords.each do |password|
      @organization.password = password

      assert @organization.valid?
    end
  end

  def test_validation_should_not_accept_invalid_passwords
    invalid_passwords = %w[123456 abcdef !abcde 12345@]
    invalid_passwords.each do |password|
      @organization.password = password

      assert_not @organization.valid?
      assert_includes @organization.errors.full_messages, "Password is invalid"
    end
  end
end
