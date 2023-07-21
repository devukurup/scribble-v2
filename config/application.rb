# frozen_string_literal: true

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ScribbleByDevuKurup
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.active_job.queue_adapter = :sidekiq

    config.generators do |g|
      g.test_framework :test_unit, fixture: false
      g.orm :active_record, primary_key_type: :uuid
    end

    config.active_record.yaml_column_permitted_classes = [Symbol, Date, Time, ActiveSupport::TimeWithZone,
      ActiveSupport::TimeZone]
  end
end
