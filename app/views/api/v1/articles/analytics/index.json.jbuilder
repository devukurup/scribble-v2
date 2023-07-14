# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :title, :slug, :created_at, :visit_count
  json.category article.category.title
end

json.total_count @total_count
