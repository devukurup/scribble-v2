# frozen_string_literal: true

class Articles::FilterService
  attr_reader :user, :filters

  def initialize(user, filters)
    @user = user
    @filters = filters
  end

  def process
    load_articles

    filter_by_search_term
    filter_by_categories
    filter_by_status

    paginate
  end

  private

    def load_articles
      @articles = user.articles.includes(:category).order(updated_at: :desc)
    end

    def filter_by_search_term
      @articles = @articles.where("title ILIKE ?", "%#{filters[:search_term]}%")
    end

    def filter_by_categories
      if filters[:category_ids].present?
        @articles = @articles.where(category_id: filters[:category_ids])
      end
    end

    def filter_by_status
      @articles = @articles.where(status: filters[:status]) if filters[:status].present?
    end

    def paginate
      return @articles unless filters[:page].present?

      @articles.page(filters[:page]).per(filters[:limit])
    end
end
