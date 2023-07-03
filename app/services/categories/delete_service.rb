# frozen_string_literal: true

class Categories::DeleteService
  attr_accessor :category, :user, :target_category_id, :errors

  def initialize(user, category, target_category_id = nil)
    @user = user
    @category = category
    @target_category_id = target_category_id
    @errors = []
  end

  def process
    Category.transaction do
      if has_articles?
        validate_category!

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
      user.categories.count == 1
    end

    def has_articles?
      category.articles.exists?
    end

    def load_target_category!
      @target_category = user.categories.find(target_category_id) and return if target_category_id.present?

      @target_category = create_general_category!
    end

    def create_general_category!
      user.categories.create!(title: "General")
    end

    def move_articles_to_target_category!
      category.articles.find_each do |article|
        article.update!(category_id: @target_category.id)
      end
    end

    def destroy_category!
      @category.destroy!
    end

    def last_general_category?
      last_category? && category.title.downcase == "general"
    end

    def set_error!(erorr)
      @errors << erorr

      raise ActiveRecord::Rollback
    end

    def validate_category!
      return if target_category_id.present?

      set_error!(t("errors.category.last_general_category")) if last_general_category?
      set_error!(t("errors.category.missing_target_category")) unless last_category?
    end
end
