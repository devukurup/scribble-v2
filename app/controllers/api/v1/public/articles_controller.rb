# frozen_string_literal: true

class Api::V1::Public::ArticlesController < ApplicationController
    before_action :load_site!, only: %i[index show]
    before_action :authenticate_site_using_x_auth_token, only: :show, if: :is_authenticatable
    before_action :load_article!, only: :show

    def show
      render
    end

    private

      def load_article!
        @article = @site.user.articles.find_by!(slug: params[:slug])
      end
  end