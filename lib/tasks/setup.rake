# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added."
  end
end

def create_sample_data!
  puts "Seeding with sample data..."
  create_site!
  create_user! email: "oliver@example.com"
  5.times do
    category = create_category!
    2.times do
      create_article!("draft", category)
      create_article!("published", category)
    end
  end

end

def create_site!
  site_attributes = { title: "Spinkart" }
  @site = Site.create! site_attributes
end

def create_user!(options = {})
  user_attributes = { first_name: "Oliver", last_name: "Smith" }.merge options
  @user = @site.users.create! user_attributes
end

def create_category!
  category_attributes = {
    title: Faker::Lorem.unique.word,
    user: @user
  }
  @site.categories.create! category_attributes
end

def create_article!(status, category)
  article_attribute = {
    title: Faker::Lorem.word,
    body: Faker::Lorem.paragraph,
    status: status,
    category: category,
    user: @user
  }
  @site.articles.create! article_attribute
end