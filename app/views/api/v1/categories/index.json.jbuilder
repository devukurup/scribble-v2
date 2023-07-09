# frozen_string_literal: true

json.categories @categories do |category|
  json.partial!("api/v1/categories/category", category:)
  json.articles_count category.articles_count
end

json.categories_count @categories.size
