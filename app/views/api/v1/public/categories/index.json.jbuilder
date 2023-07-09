# frozen_string_literal: true

json.categories @categories do |category|
  json.partial!("api/v1/categories/category", category:)

  json.articles category.articles do |article|
    json.extract! article, :slug, :title
  end
end
