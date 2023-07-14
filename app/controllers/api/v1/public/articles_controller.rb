# frozen_string_literal: true

class Api::V1::Public::ArticlesController < ApplicationController
  before_action :authenticate_site_using_x_auth_token, if: :authenticatable?
  before_action :load_article!, only: :show

  def show
    render
  end

  def search
    @articles = @site.articles.published.where("title ILIKE :search_term OR body ILIKE :search_term", { search_term: "%#{params[:search_term]}%" })
  end

  private

    def load_article!
      @article = @site.articles.published.find_by!(slug: params[:slug])
    end
end
