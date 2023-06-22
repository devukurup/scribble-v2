# frozen_string_literal: true

class Articles::BulkUpdateService
  attr_reader :user, :options, :articles

  def initialize(user, options)
    @user = user
    @options = options
  end

  def process
    load_articles

    update_articles
  end

  private

    def load_articles
      @articles = user.articles.where(id: options[:article_ids])
    end

    def update_articles
      Article.transaction do
        articles.find_each do |article|
          article.update!(article_attributes)
        end
      end
    end

    def article_attributes
      {
        status: options[:status],
        category_id: options[:category_id]
      }.compact
    end
end
