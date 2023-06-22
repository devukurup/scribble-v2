# frozen_string_literal: true

class Articles::BulkDeleteService
  attr_reader :user, :options, :articles

  def initialize(user, options)
    @user = user
    @options = options
  end

  def process
    load_articles

    delete_articles
  end

  private

    def load_articles
      @articles = user.articles.where(id: options[:article_ids])
    end

    def delete_articles
      articles.destroy_all
    end
end
