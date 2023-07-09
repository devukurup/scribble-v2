# frozen_string_literal: true

require "test_helper"

class Articles::FilterServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 2

  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @category = create(:category, site: @site)
  end

  def test_filter_articles_based_on_search_term
    test_article_1 = create(:article, title: "Hello there", site: @site, user: @user, category: @category)
    create(:article, title: "Hai there", site: @site, user: @user, category: @category)
    articles = service({ search_term: "hello" }).process

    assert_equal [test_article_1.id], articles.map(&:id)
  end

  def test_filter_articles_based_on_category_ids
    test_category = create(:category, site: @site)
    test_articles = create_list(:article, ARTICLES_COUNT, site: @site, user: @user, category: @category)
    create(:article, site: @site, user: @user, category: test_category)
    articles = service({ category_ids: [@category.id] }).process

    assert_equal test_articles.pluck(:id).sort, articles.map(&:id).sort
  end

  def test_filter_articles_based_on_status
    status = "published"
    test_articles = create_list(:article, ARTICLES_COUNT, site: @site, user: @user, category: @category)
    test_article_1 = test_articles.first
    test_article_1.update!(status:)
    articles = service({ status: }).process

    assert_equal [test_article_1.id], articles.map(&:id)
  end

  def test_articles_are_filtered_only_if_all_filters_are_matched
    @category = create(:category, site: @site)
    article_1 = create(
      :article, title: "Non matching title", site: @site, status: :published, user: @user,
      category: @category)
    article_2 = create(
      :article, title: "A random matching title", site: @site, status: :draft, user: @user,
      category: @category)
    filters = {
      status: :draft,
      search_term: "random",
      category_ids: [@category.id]
    }
    articles = service(filters).process

    assert_equal [article_2.id], articles.map(&:id)
  end

  def test_filter_count_is_loaded
    create(:article, site: @site, status: :published, user: @user, category: @category)
    articles = service({ status: :published }).process

    assert_equal @site.articles.count, articles.total_count
  end

  def test_should_return_paginated_articles
    page_limit = 2
    test_articles = create_list(:article, 4, site: @site, status: :published, user: @user, category: @category)
    filters = {
      status: :published,
      page: 1,
      limit: page_limit
    }
    articles = service(filters).process

    assert_equal page_limit, articles.count
  end

  def test_should_return_all_articles_when_no_filters_are_provided
    test_articles = create_list(:article, ARTICLES_COUNT, site: @site, user: @user, category: @category)
    filters = {}
    articles = service(filters).process

    assert_equal @site.articles.count, articles.count
    assert_equal test_articles.pluck(:id).sort, articles.map(&:id).sort
  end

  def test_should_return_empty_articles_when_no_articles_match_the_filters
    test_articles = create_list(
      :article, ARTICLES_COUNT, site: @site, title: "Test articles", user: @user,
      category: @category)
    filters = {
      search_term: "Invalid",
      status: :published,
      page: 1,
      limit: 2
    }
    articles = service(filters).process

    assert_equal 0, articles.count
  end

  private

    def service(filters)
      service = Articles::FilterService.new(@site, filters)
    end
end
