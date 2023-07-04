# frozen_string_literal: true

require "test_helper"

class Articles::FilterServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 2

  def setup
    @user = create(:user)
  end

  def test_filter_articles_based_on_search_term
    create(:article, title: "Hello there", user: @user)
    articles_service = service({ search_term: "hello" })
    articles_service.process

    assert_equal 1, articles_service.articles.size
  end

  def test_filter_articles_based_category_ids
    category_ids = create_list(:article, ARTICLES_COUNT, user: @user).pluck(:category_id)

    articles_service = service({ category_ids: })
    articles_service.process

    assert_equal ARTICLES_COUNT, articles_service.articles.size
  end

  def test_filter_articles_based_on_status
    create(:article, user: @user, status: :published)

    articles_service = service({ status: :published })
    articles_service.process

    assert_equal 1, articles_service.articles.size
  end

  def test_article_are_filtered_only_if_all_filters_are_matched
    category = create(:category, user: @user)
    article_1 = create(:article, title: "Non matching title", user: @user, status: :published, category:)
    article_2 = create(:article, title: "A random matching title", user: @user, status: :draft, category:)

    filters = {
      status: :published,
      status: :draft,
      search_term: "random",
      category_ids: [category.id]
    }
    articles_service = service(filters)
    articles_service.process

    assert_equal 1, articles_service.articles.size
    assert_equal article_2, articles_service.articles.first
  end

  def test_filter_coun_is_loaded
    create(:article, user: @user, status: :published)

    articles_service = service({ status: :published })
    articles_service.process

    assert_equal 1, articles_service.articles.size
    assert_equal 1, articles_service.filtered_articles_count
  end

  private

    def service(filters)
      service = Articles::FilterService.new(@user, filters)
    end
end
