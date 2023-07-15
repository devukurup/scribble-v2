# frozen_string_literal: true

class SampleData::LoaderService
  USER_ATTRIBUTES = { first_name: "Oliver", last_name: "Smith", email: "oliver@example.com" }
  SITE_ATTRIBUTES = { title: "Spinkart" }
  CATEGORY_COUNT = 5
  ARTICLE_COUNT = 10

  def initialize
  end

  def process!
    create_site!
    create_user!
    create_categories!
    create_articles!
  end

  private

    def create_site!
      @site = Site.create! SITE_ATTRIBUTES
    end

    def create_user!
      @user = @site.users.create! USER_ATTRIBUTES
    end

    def create_categories!
      CATEGORY_COUNT.times do
        create_category!
      end
    end

    def create_category!
      category_attributes = { title: Faker::Lorem.unique.word }
      @site.categories.create! category_attributes
    end

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
        user: @user
      }
      @site.articles.create! article_attribute
    end

    def categories
      @_categories ||= @site.categories
    end
end
