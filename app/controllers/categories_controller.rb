# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update]

  def index
    @categories = current_user.categories.where("title ILIKE ?", "%#{params[:search_term]}%").order(:position)
  end

  def create
    current_user.categories.create!(category_params)
    render_notice(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    render_notice(t("successfully_updated", entity: "Category")) unless params.key?(:quiet)
  end

  private

    def category_params
      params.require(:category).permit(:title, :position)
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
