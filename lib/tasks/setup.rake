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
  create_organization!
  create_user! email: "oliver@example.com"
end

def create_organization!
  organization_attributes = { name: "Spinkart" }
  Organization.create! organization_attributes
end

def create_user!(options = {})
  user_attributes = { first_name: "Oliver", last_name: "Smith", organization_id: Organization.first.id }.merge options
  User.create! user_attributes
end
