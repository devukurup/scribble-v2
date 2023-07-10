# frozen_string_literal: true

class Categories::DeleteService
  include ActionView::Helpers::TranslationHelper

  attr_reader :category, :site, :target_category_id, :errors, :target_category

  def initialize(site, category, target_category_id = nil)
    @site = site
    @category = category
    @target_category_id = target_category_id

    @errors = []
  end

  def process!
    validate_categories

    return unless errors.empty?

    Category.transaction do
      if has_articles?
        load_target_category!
        move_articles_to_target_category!
      end

      destroy_category!
    end
  end

  def success?
    errors.empty?
  end

  private

    def last_category?
      site.categories.size == 1
    end

    def has_articles?
      category.articles.exists?
    end

    def load_target_category!
      if target_category_id.present?
        @target_category = site.categories.find(target_category_id) and return
      end

      @target_category = create_general_category!
    end

    def create_general_category!
      site.categories.create!(title: Category::GENERAL_CATEGORY_TITLE)
    end

    def move_articles_to_target_category!
      category.articles.find_each do |article|
        article.update!(category_id: target_category.id)
      end
    end

    def destroy_category!
      category.destroy!
    end

    def last_general_category?
      last_category? && category.title.downcase == Category::GENERAL_CATEGORY_TITLE.downcase
    end

    def validate_categories
      return if target_category_id.present? || !has_articles?

      errors << (t("errors.category.last_general_category")) if last_general_category?
      errors << (t("errors.category.missing_target_category")) unless last_category?
    end
end
