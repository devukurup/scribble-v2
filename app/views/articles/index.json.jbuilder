# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :status, :last_published_at
  json.author article.user.name
  json.category article.category.title
end
