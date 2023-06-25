# frozen_string_literal: true

json.categories @categories do |category|
  if category.articles.count > 0
    json.extract! category, :id, :title
    json.articles category.articles.published do |article|
      json.extract! article, :slug, :title
    end
  end
end