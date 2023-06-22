# frozen_string_literal: true

require "test_helper"

class Articles::BulkUpdateServiceTest < ActiveSupport::TestCase
  ARTICLES_COUNT = 2

  def setup
    @user = create(:user)
    @articles = create_list(:article, ARTICLES_COUNT, user: @user)

    @options = {
      article_ids: @articles.map(&:id)
    }
  end

  def test_articles_category_should_be_updated
    category = create(:category)
    @options.merge!({ category_id: category.id })

    Articles::BulkUpdateService.new(@user, @options).process

    @articles.each do |article|
      assert_equal category.id, article.reload.category_id
    end
  end
end
