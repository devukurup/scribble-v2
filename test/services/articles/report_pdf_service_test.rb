# frozen_string_literal: true

require "test_helper"

class Articles::ReportPdfServiceTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
    @service = Articles::ReportPdfService.new(@user.id)
  end

  def test_should_generate_and_attach_pdf_report_to_the_user
    assert_nil @user.report.attachment

    @service.process

    assert @user.reload.report.attached?
    assert_equal "application/pdf", @user.report.content_type
    assert_equal Articles::ReportPdfService::FILE_NAME, @user.report.filename.to_s
  end

  def test_should_broadcast_the_progress_to_action_cable
    broadcast_mock = MiniTest::Mock.new
    4.times { broadcast_mock.expect(:broadcast, nil, [String, Hash]) }

    ActionCable.stub :server, broadcast_mock do
      @service.process
    end

    assert_mock broadcast_mock
  end
end
