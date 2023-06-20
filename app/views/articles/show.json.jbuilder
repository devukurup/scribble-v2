# frozen_string_literal: true

json.article do
  json.extract! @article, :id, :title, :body, :status, :last_published_at
  json.category @article.category.title
  json.category_id @article.category.id
end
