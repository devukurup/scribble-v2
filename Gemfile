# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3", ">= 7.0.3.1"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]

  # For code formatting and linting
  gem "rubocop", require: false
  gem "rubocop-rails", require: false

  # Rails integration for factory_bot, a replacement for fixtures
  gem "factory_bot_rails"

  # For auto-generating demo data
  gem "faker"

  gem "pry-byebug"

  gem "database_cleaner"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  # For linting ERB files
  gem "erb_lint", require: false, git: "https://github.com/Shopify/erb-lint.git", branch: "main"
end

group :test do
  # Code coverage analysis tool
  gem "simplecov", require: false

  # for stubbing and setting expectations on HTTP requests
  gem "webmock"

  # To mock and stub objects in tests
  gem "mocha"
end

gem "shakapacker"

gem "react-rails"

# For sorting and reordering objects
gem "acts_as_list"

# For paginating responses
gem "kaminari"

# For securing password
gem "bcrypt", "~> 3.1.13"

# For model versioning
gem "paper_trail"

# For background jobs
gem "sidekiq", "<7"

# For periodic sidekiq jobs
gem "sidekiq-cron"

# PDF generation gem
gem "wicked_pdf"
# wicked_pdf uses the following binary
gem "wkhtmltopdf-binary"

# Required by Active Storage to use the GCS
gem "google-cloud-storage"

# To load the environment variables
gem "dotenv-rails"
