# frozen_string_literal: true

json.article do
  json.partial! "api/v1/articles/article", article: @article

  json.category do
    json.partial! "api/v1/categories/category", category: @article.category
  end
end
