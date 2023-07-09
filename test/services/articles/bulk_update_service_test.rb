# frozen_string_literal: true

require "test_helper"

class Articles::BulkUpdateServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 2

  def setup
    @site = create(:site)
    user = create(:user, site: @site)
    category = create(:category, site: @site)
    @articles = create_list(:article, ARTICLES_COUNT, site: @site, category:, user:)

    @options = {
      article_ids: @articles.map(&:id)
    }
  end

  def test_should_update_articles_with_given_category_id
    category = create(:category, site: @site)
    @options.merge!(category_id: category.id)

    Articles::BulkUpdateService.new(@site, @options).process!

    @articles.each do |article|
      assert_equal category.id, article.reload.category_id
    end
  end

  def test_should_update_articles_with_given_status
    status = "published"
    @options.merge!(status:)
    Articles::BulkUpdateService.new(@site, @options).process!

    @articles.each do |article|
      assert_equal status, article.reload.status
    end
  end

  def test_should_raise_error_on_invalid_params
    category_id = "invalid"
    test_article = @articles.first
    options = { article_ids: [test_article], category_id: }
    service = Articles::BulkUpdateService.new(@site, options)

    assert_raises ActiveRecord::RecordInvalid do
      service.process!
    end
    assert_not_equal category_id, test_article.reload.category_id
  end
end
