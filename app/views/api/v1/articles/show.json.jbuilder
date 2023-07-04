# frozen_string_literal: true

json.article do
  json.extract! @article, :id, :title, :body, :status, :last_published_at, :updated_at

  json.category do
    json.title @article.category.title
    json.id @article.category.id
  end
end