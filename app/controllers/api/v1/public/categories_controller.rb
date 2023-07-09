# frozen_string_literal: true

class Api::V1::Public::CategoriesController < ApplicationController
  before_action :authenticate_site_using_x_auth_token, only: :index, if: :authenticatable?

  def index
    @categories = @site.categories.with_published_articles.includes(:articles).order(:position)
  end
end
