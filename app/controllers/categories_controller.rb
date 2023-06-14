# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update]

  def index
    @categories = current_user.categories
  end

  def create
    current_user.categories.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    render_notice(t("successfully_updated", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:title)
    end

    def load_category!
      @category = Category.find(params[:id])
    end
end
