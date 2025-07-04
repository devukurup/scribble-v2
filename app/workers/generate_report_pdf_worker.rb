# frozen_string_literal: true

class GenerateReportPdfWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(user_id)
    Articles::ReportPdfService.new(user_id).process
  end
end
