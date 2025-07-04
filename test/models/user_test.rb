# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_without_first_name
    @user.first_name = ""

    assert_not @user.valid?
    assert_includes @user.errors.full_messages, t("errors.blank", entity: User.human_attribute_name("first_name"))
  end

  def test_user_should_not_be_valid_without_last_name
    @user.last_name = ""

    assert_not @user.valid?
    assert_includes @user.errors.full_messages, t("errors.blank", entity: User.human_attribute_name("last_name"))
  end

  def test_user_should_not_be_valid_without_email
    @user.email = ""

    assert_not @user.valid?
    assert_includes @user.errors.full_messages, t("errors.blank", entity: User.human_attribute_name("email"))
  end

  def test_first_name_should_be_invalid_if_length_exceeds_maximum_length
    @user.first_name = "a" * (User::MAX_NAME_LENGTH + 1)

    assert_not @user.valid?
    assert_includes @user.errors.full_messages,
      t("errors.too_long", entity: User.human_attribute_name("first_name"), maximum: User::MAX_NAME_LENGTH)
  end

  def test_last_name_should_be_invalid_if_length_exceeds_maximum_length
    @user.last_name = "a" * (User::MAX_NAME_LENGTH + 1)

    assert_not @user.valid?
    assert_includes @user.errors.full_messages,
      t("errors.too_long", entity: User.human_attribute_name("last_name"), maximum: User::MAX_NAME_LENGTH)
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
    test_user = @user.dup

    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, t("errors.taken", entity: User.human_attribute_name("email"))
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = @user.email.upcase
    @user.update!(email: uppercase_email)

    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in]
    valid_emails.each do |email|
      @user.email = email

      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com
fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email

      assert_not @user.valid?
      assert_includes @user.errors.full_messages, t("errors.invalid", entity: User.human_attribute_name("email"))
    end
  end

  def test_user_should_not_be_valid_without_site
    @user.site = nil

    assert_not @user.valid?
    assert_includes @user.errors.full_messages, t("errors.must_exist", entity: User.human_attribute_name("site"))
  end

  def test_name_should_concatenate_first_name_and_last_name
    @user = create(:user, first_name: "Oliver", last_name: "Smith")

    assert_equal "Oliver Smith", @user.name
  end
end
