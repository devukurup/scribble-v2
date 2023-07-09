# frozen_string_literal: true

require "test_helper"

class Articles::BulkDeleteServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 10

  def setup
    user = create(:user)
    @site = user.site
    category = create(:category, site: @site)
    @articles = create_list(:article, ARTICLES_COUNT, site: @site, category:, user:)
  end

  def test_articles_should_be_deleted
    options = {
      article_ids: @articles.map(&:id)
    }

    assert_difference "@site.articles.count", -ARTICLES_COUNT do
      Articles::BulkDeleteService.new(@site, options).process
    end
  end
end
