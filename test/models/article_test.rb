# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_not_be_valid_without_body
    @article.body = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Body can't be blank"
  end

  def test_article_should_not_be_valid_without_status
    @article.status = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end

  def test_article_should_not_be_valid_without_slug
    @article.slug = ""

    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Slug can't be blank"
  end

  def test_values_of_created_at_and_updated_at
    article = Article.new(title: "Introduction", body: "Introduciton to html", user: @user, category: @category)

    assert_nil article.created_at
    assert_nil article.updated_at

    article.save!

    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at

    article.update!(title: "Updated introduction")

    assert_not_equal article.updated_at, article.created_at
  end

  def test_article_should_not_be_valid_without_user
    @article.user = nil

    assert_not @article.save
    assert_includes @article.errors.full_messages, "User must exist"
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)

    assert_not @article.valid?
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
      assert_includes @article.errors.full_messages, "Title is invalid"
    end
  end

  def test_status_should_contain_default_value
    assert_equal "draft", @article.status
  end

  def test_last_published_at_should_be_nil_when_status_has_default_value
    assert_nil @article.last_published_at
  end

  def test_last_published_at_should_update_when_status_is_changed_to_published
    @article.update!(status: "published")
    @article.reload

    assert_equal @article.updated_at.strftime("%Y-%m-%d %H:%M"), @article.last_published_at.strftime("%Y-%m-%d %H:%M")
  end

  def test_last_published_at_should_not_update_when_status_is_not_updated
    @article.update!(status: "published")
    last_published_at = @article.reload.last_published_at
    @article.update!(title: "test article")

    assert_equal last_published_at, @article.reload.last_published_at
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    article_params = { title: "test article", body: "test article body", user: @user, category: @category }
    first_article = Article.create!(article_params)
    second_article = Article.create!(article_params)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    article_params = { title: "test-article", body: "test article body", user: @user, category: @category }
    first_article = Article.create!(article_params)
    second_article = Article.create!(article_params)

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(title: "testing", body: "test article body", user: @user, category: @category)
    second_article = Article.create!(title: "test", body: "test article body", user: @user, category: @category)

    assert_equal "testing", first_article.slug
    assert_equal "test", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    test_article = Article.create!(title: "test article", body: "test article body", user: @user, category: @category)

    assert_raises ActiveRecord::RecordInvalid do
      test_article.update!(slug: @article.slug)
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    article_params = { title:, body: "test article body", user: @user, category: @category }
    first_article = Article.create!(article_params)
    second_article = Article.create!(article_params)
    third_article = Article.create!(article_params)
    fourth_article = Article.create!(article_params)

    assert_equal "#{title.parameterize}-4", fourth_article.slug

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(article_params)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_article}", new_article.slug
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    new_title = "top 9 recipes"
    title_having_new_title_as_substring = "top 9 recipes for bachelors"

    existing_article = Article.create!(
      title: title_having_new_title_as_substring, body: "test article body",
      user: @user, category: @category)
    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug

    new_article = Article.create!(title: new_title, body: "test article body", user: @user, category: @category)
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Top 9 kitchen recipes for bachelors"
    new_title = "recipes for bachelors"

    existing_article = Article.create!(
      title: title_having_new_title_as_ending_substring, body: "test article body",
      user: @user, category: @category)
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_article.slug

    new_article = Article.create!(title: new_title, body: "test article body", user: @user, category: @category)
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "top 9 recipes"

    existing_article = Article.create!(
      title: title_with_numbered_substring, body: "test article body", user: @user,
      category: @category)
    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "top"
    new_article = Article.create!(
      title: substring_of_existing_slug, body: "test article body", user: @user,
      category: @category)

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10)
    slugs = articles.pluck(:slug)

    assert_equal slugs.uniq, slugs
  end
end
