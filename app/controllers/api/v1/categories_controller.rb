# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = @site.categories.where("title ILIKE ?", "%#{params[:search_term]}%")
  end

  def create
    @category = @site.categories.create!(category_params)
  end

  def update
    @category.update!(category_params)

    render_notice(t("success.updated", entity: Category.model_name.human)) unless params.key?(:quiet)
  end

  def destroy
    service = Categories::DeleteService.new(@site, @category, params[:target_category_id])
    service.process!

    if service.success?
      render_notice(t("success.deleted", entity: Category.model_name.human))
    else
      render_error(service.errors.full_messages.to_sentence)
    end
  end

  private

    def category_params
      params.require(:category).permit(:title, :position)
    end

    def load_category!
      @category = @site.categories.find(params[:id])
    end
end
