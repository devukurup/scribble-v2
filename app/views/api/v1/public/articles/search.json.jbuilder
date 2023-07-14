# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :title, :body, :slug
end