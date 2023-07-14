# frozen_string_literal: true

class Api::V1::Articles::VersionsController < ApplicationController
  before_action :load_article!
  before_action :load_version!, only: %i[show restore]

  def index
    @versions = @article.versions.order(created_at: :desc)
  end

  def show
    render
  end

  def restore
    @article.restore!(@version)

    render_notice(t("success.restored", entity: Article.model_name.human))
  end

  private

    def load_article!
      @article = @site.articles.find(params[:article_id])
    end

    def load_version!
      @version = @article.versions.find(params[:id]).reify
    end
end
