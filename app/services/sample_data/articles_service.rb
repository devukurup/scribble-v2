# frozen_string_literal: true

class SampleData::ArticlesService < SampleData::Base
  ARTICLE_COUNT = 10

  def process!
    create_articles!
  end

  private

    def create_articles!
      ARTICLE_COUNT.times do
        category = categories.sample
        create_article!("draft", category)
        create_article!("published", category)
      end
    end

    def create_article!(status, category)
      article_attribute = {
        title: Faker::Lorem.word,
        body: Faker::Lorem.paragraph,
        status:,
        category:,
        user: current_user
      }
      current_site.articles.create! article_attribute
end
end
