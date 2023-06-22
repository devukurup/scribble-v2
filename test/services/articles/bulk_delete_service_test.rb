# frozen_string_literal: true

require "test_helper"

class Articles::BulkDeleteServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 10

  def setup
    @user = create(:user)
    @articles = create_list(:article, ARTICLES_COUNT, user: @user)
  end

  def test_articles_should_be_deleted
    options = {
      article_ids: @articles.map(&:id)
    }

    assert_difference "Article.count", -ARTICLES_COUNT do
      Articles::BulkDeleteService.new(@user, options).process
    end
  end
end
