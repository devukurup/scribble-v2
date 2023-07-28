# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class GenerateReportPdfWorkerTest < ActiveJob::TestCase
  def test_report_pdf_service_is_triggered
    Sidekiq::Testing.inline!

    report_pdf_service_mock = MiniTest::Mock.new
    report_pdf_service_mock.expect(:process, true)

    Articles::ReportPdfService.stub :new, report_pdf_service_mock do
      GenerateReportPdfWorker.perform_async("user_id")
    end

    assert_mock report_pdf_service_mock
  end
end
