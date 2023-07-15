# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
    @article = create(:article, category: @category, user: @user, site: @site)
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("errors.blank", entity: Article.human_attribute_name("title"))
  end

  def test_article_title_should_be_invalid_if_length_exceeds_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)

    assert_not @article.valid?
    assert_includes @article.errors.full_messages,
      t("errors.too_long", entity: Article.human_attribute_name("title"), maximum: Article::MAX_TITLE_LENGTH)
  end

  def test_validation_should_accept_valid_titles
    valid_titles = %w[Getting\ started security\ &\ privacy new-article new-article2]
    valid_titles.each do |title|
      @article.title = title

      assert @article.valid?
    end
  end

  def test_validation_should_reject_invalid_titles
    invalid_titles = %w[1Getting\ started _security\ &\ privacy new_article new.article2]
    invalid_titles.each do |title|
      @article.title = title

      assert_not @article.valid?
      assert_includes @article.errors.full_messages, t("errors.invalid", entity: Article.human_attribute_name("title"))
    end
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("errors.blank", entity: Article.human_attribute_name("body"))
  end

  def test_article_should_not_be_valid_without_slug
    @article.slug = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("errors.blank", entity: Article.human_attribute_name("slug"))
  end

  def test_article_should_not_be_valid_without_visit_count
    @article.visit_count = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages,
      t("errors.blank", entity: Article.human_attribute_name("visit_count"))
  end

  def test_article_should_not_be_valid_without_user
    @article.user = nil

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("errors.must_exist", entity: Article.human_attribute_name("user"))
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil

    assert_not @article.valid?
    assert_includes @article.errors.full_messages,
      t("errors.must_exist", entity: Article.human_attribute_name("category"))
  end

  def test_article_should_not_be_valid_without_site
    @article.site = nil

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, t("errors.must_exist", entity: Article.human_attribute_name("site"))
  end

  def test_last_published_at_should_be_nil_when_status_has_default_value
    assert_nil @article.last_published_at
  end

  def test_last_published_at_should_update_when_status_is_changed_to_published
    @article.update!(status: "published")
    @article.reload

    assert_equal @article.updated_at.to_i, @article.last_published_at.to_i
  end

  def test_last_published_at_should_not_update_when_status_is_not_changed
    @article.update!(status: "published")
    last_published_at = @article.reload.last_published_at
    @article.update!(title: "test article")

    assert_equal last_published_at, @article.reload.last_published_at
  end

  def test_last_published_at_should_not_update_when_status_is_updated_to_draft
    @article.update!(status: "published")
    last_published_at = @article.reload.last_published_at
    @article.update!(status: "draft")

    assert_equal last_published_at, @article.reload.last_published_at
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    title = "test article"
    first_article = Article.create!(article_params(title))
    second_article = Article.create!(article_params(title))

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    title = "test-article"
    first_article = Article.create!(article_params(title))
    second_article = Article.create!(article_params(title))

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(article_params("testing"))
    second_article = Article.create!(article_params("test"))

    assert_equal "testing", first_article.slug
    assert_equal "test", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    test_article = Article.create!(article_params("test article"))

    assert_raises ActiveRecord::RecordInvalid do
      test_article.update!(slug: @article.slug)
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    first_article = Article.create!(article_params(title))
    second_article = Article.create!(article_params(title))
    third_article = Article.create!(article_params(title))
    fourth_article = Article.create!(article_params(title))

    assert_equal "#{title.parameterize}-4", fourth_article.slug

    third_article.destroy!
    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1
    new_article = Article.create!(article_params(title))

    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_article}", new_article.slug
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    new_title = "top 9 recipes"
    title_having_new_title_as_substring = "top 9 recipes for bachelors"
    existing_article = Article.create!(article_params(title_having_new_title_as_substring))
    new_article = Article.create!(article_params(new_title))

    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    new_title = "recipes for bachelors"
    title_having_new_title_as_ending_substring = "Top 9 kitchen recipes for bachelors"
    existing_article = Article.create!(article_params(title_having_new_title_as_ending_substring))
    new_article = Article.create!(article_params(new_title))

    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_article.slug
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "top 9 recipes"
    existing_article = Article.create!(article_params(title_with_numbered_substring))

    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "top"
    new_article = Article.create!(article_params(substring_of_existing_slug))

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end

  private

    def article_params(title = "")
      {
        title:,
        body: "Test article body",
        user: @user,
        category: @category,
        site: @site
      }
    end
end
