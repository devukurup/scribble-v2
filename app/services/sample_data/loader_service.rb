# frozen_string_literal: true

class SampleData::LoaderService
  include SampleData::LoadersList

  def process!
    load_sample_data!
  rescue
    SampleData::DatabaseCleanupService.new.process!
  end

  private

    def load_sample_data!
      loaders_list.each do |loader_service|
        loader_service.new.process!
      end
    end
end
