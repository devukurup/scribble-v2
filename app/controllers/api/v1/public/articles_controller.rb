# frozen_string_literal: true

class Api::V1::Public::ArticlesController < ApplicationController
  before_action :load_site!, only: :show
  before_action :authenticate_site_using_x_auth_token, only: :show, if: :authenticatable?
  before_action :load_article!, only: :show

  def show
    render
  end

  private

    def load_article!
      @article = @site.user.articles.published.find_by!(slug: params[:slug])
    end
end
