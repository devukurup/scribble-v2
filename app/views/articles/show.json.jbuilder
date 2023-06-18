# frozen_string_literal: true

json.article do
  json.extract! @article, :id, :title, :body, :status, :last_published_at
  json.category @article.category.title
end
