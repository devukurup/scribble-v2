# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]

  def index
    @articles = current_user.articles.includes(:category, :user).order("updated_at DESC")
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    render_notice(t("successfully_updated", entity: "Article"))
  end

  def create
    current_user.articles.create!(article_params)
    render_notice(t("successfully_created", entity: "Article"))
  end

  def destroy
    @article.destroy!
    render_notice(t("successfully_deleted", entity: "Article"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
