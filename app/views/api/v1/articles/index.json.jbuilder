# frozen_string_literal: true

json.articles @service.articles do |article|
  json.extract! article, :id, :title, :body, :status, :last_published_at
  json.author article.user.name
  json.category article.category.title
end

json.filtered_articles_count @service.filtered_articles_count
json.all_articles_count Article.count
json.published_articles_count Article.published.count
json.draft_articles_count Article.draft.count
