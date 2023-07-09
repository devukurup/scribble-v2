# frozen_string_literal: true

class Articles::BulkDeleteService
  attr_reader :site, :options, :articles

  def initialize(site, options)
    @site = site
    @options = options
  end

  def process
    load_articles

    delete_articles
  end

  private

    def load_articles
      @articles = site.articles.where(id: options[:article_ids])
    end

    def delete_articles
      Article.transaction do
        articles.destroy_all
      end
    end
end
