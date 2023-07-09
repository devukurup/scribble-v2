# frozen_string_literal: true

class Articles::FilterService
  attr_reader :site, :filters, :articles

  def initialize(site, filters)
    @site = site
    @filters = filters

    @articles = []
  end

  def process
    load_articles

    filter_by_search_term
    filter_by_categories
    filter_by_status
    paginate

    articles
  end

  private

    def load_articles
      @articles = site.articles.includes(:category, :user).order(updated_at: :desc)
    end

    def filter_by_search_term
      @articles = articles.where("title ILIKE ?", "%#{filters[:search_term]}%")
    end

    def filter_by_categories
      @articles = articles.where(category_id: filters[:category_ids]) if filters[:category_ids].present?
    end

    def filter_by_status
      @articles = articles.where(status: filters[:status]) if filters[:status].present?
    end

    def paginate
      @articles = articles.page(filters[:page]).per(filters[:limit])
    end
end
