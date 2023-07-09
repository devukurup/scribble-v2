# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = build(:site)
  end

  def test_site_should_be_valid
    assert @site.valid?
  end

  def test_site_should_not_be_valid_without_title
    @site.title = ""

    assert_not @site.valid?
    assert_includes @site.errors.full_messages, t("errors.blank", entity: "Title")
  end

  def test_site_should_not_be_valid_without_unique_title
    @site.save!
    test_site = @site.dup

    assert_not test_site.valid?
    assert_includes test_site.errors.full_messages, t("errors.taken", entity: "Title")
  end

  def test_site_title_should_be_invalid_if_length_exceeds_maximum_length
    @site.title = "a" * (Site::MAX_LENGTH + 1)

    assert_not @site.valid?
    assert_includes @site.errors.full_messages,
      t("errors.too_long", maximum: Site::MAX_LENGTH, entity: "Title")
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
      assert_includes @site.errors.full_messages, t("errors.invalid", entity: "Title")
    end
  end

  def test_password_should_not_be_valid_with_invalid_length
    @site.password = "1#{ "a" * (Site::MIN_PASSWORD_LENGTH - 2)}"

    assert_not @site.valid?
    assert_includes @site.errors.full_messages,
      t("errors.too_short", entity: "Password", minimum: Site::MIN_PASSWORD_LENGTH)

    @site.password = "1#{"a" * (Site::MAX_LENGTH)}"

    assert_not @site.valid?
    assert_includes @site.errors.full_messages,
      t("errors.too_long", entity: "Password", maximum: Site::MAX_LENGTH)
  end

  def test_validation_should_accept_valid_passwords
    valid_passwords = %w[1abcde ab1cde abc1de 111a11 11@2a!! 11!3a#]
    valid_passwords.each do |password|
      @site.password = password

      assert @site.valid?
    end
  end

  def test_validation_should_reject_invalid_passwords
    invalid_passwords = %w[123456 abcdef !abcde 12345@]
    invalid_passwords.each do |password|
      @site.password = password

      assert_not @site.valid?
      assert_includes @site.errors.full_messages, t("errors.invalid", entity: "Password")
    end
  end

  def test_site_should_have_unique_authentication_token
    @site.save!
    test_site = create(:site)

    assert_not_same @site.authentication_token, test_site.authentication_token
  end

  def test_destroying_a_site_should_destroy_associated_users_redirections_categories_and_articles
    @site.save!
    user = create(:user, site: @site)
    redirection = create(:redirection, site: @site)
    category = create(:category, site: @site)
    article = create(:article, site: @site)

    assert_difference("User.count", -1) do
      assert_difference("Redirection.count", -1) do
        assert_difference("Category.count", -1) do
          assert_difference("Article.count", -1) do
            @site.destroy!
          end
        end
      end
    end

    assert_not User.exists?(user.id)
    assert_not Redirection.exists?(redirection.id)
    assert_not Category.exists?(category.id)
    assert_not Article.exists?(article.id)
  end
end
