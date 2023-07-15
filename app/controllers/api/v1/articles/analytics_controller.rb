# frozen_string_literal: true

class Api::V1::Articles::AnalyticsController < ApplicationController
  before_action :load_published_articles

  def index
    @total_count = @articles.size
    @articles = @articles.includes(:category)
      .order(visit_count: params[:order])
      .page(params[:page]).per(params[:limit])
  end

  private

    def load_published_articles
      @articles = @site.articles.published
    end
end
