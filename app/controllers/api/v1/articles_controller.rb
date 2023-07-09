# frozen_string_literal: true

class Api::V1::ArticlesController < ApplicationController
  before_action :load_current_user!, only: :create
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_articles, only: :index

  def index
    @filtered_articles = Articles::FilterService.new(@site, filter_params).process
  end

  def show
    render
  end

  def update
    @article.update!(article_params)

    render_notice(t("success.updated", entity: Article.model_name.human))
  end

  def create
    @site.articles.create!(article_params.merge(user: @current_user))

    render_notice(t("success.created", entity: Article.model_name.human))
  end

  def destroy
    @article.destroy!

    render_notice(t("success.deleted", entity: Article.model_name.human))
  end

  def bulk_destroy
    Articles::BulkDeleteService.new(@site, bulk_params).process

    render_notice(t("articles.success.deleted", count: bulk_articles_count))
  end

  def bulk_update
    Articles::BulkUpdateService.new(@site, bulk_params).process!

    render_notice(t("articles.success.updated", count: bulk_articles_count))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article!
      @article = @site.articles.find(params[:id])
    end

    def load_articles
      @articles = @site.articles
    end

    def filter_params
      params.permit(:status, :search_term, :page, :limit, category_ids: [])
    end

    def bulk_params
      params.permit(:status, :category_id, article_ids: [])
    end

    def bulk_articles_count
      bulk_params[:article_ids].length
    end
end
