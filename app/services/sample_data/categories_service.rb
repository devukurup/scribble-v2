# frozen_string_literal: true

class SampleData::CategoriesService < SampleData::Base
  CATEGORY_COUNT = 5

  def process!
    create_categories!
  end

  private

    def create_categories!
      CATEGORY_COUNT.times do
        create_category!
      end
    end

    def create_category!
      category_attributes = { title: Faker::Lorem.unique.word }
      current_site.categories.create! category_attributes
    end
end
