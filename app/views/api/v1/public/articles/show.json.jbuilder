# frozen_string_literal: true

json.article do
    if @article.published? && @article.category.present?
      json.extract! @article,
        :id,
        :title,
        :body
    end
  end