# frozen_string_literal: true

class SampleData::DatabaseCleanupService
  def process!
    DatabaseCleaner.clean_with :truncation
  end
end
