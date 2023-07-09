# frozen_string_literal: true

json.articles @filtered_articles do |article|
  json.partial!("api/v1/articles/article", article:)
  json.author article.user.name
  json.category article.category.title
end

json.filtered_articles_count @filtered_articles.total_count
json.all_articles_count @articles.size
json.published_articles_count @articles.published.size
json.draft_articles_count @articles.draft.size
