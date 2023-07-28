# frozen_string_literal: true

class Articles::ReportPdfService
  include ActionView::Helpers::TranslationHelper

  TEMPLATE_PATH = "articles/report/download"
  FILE_NAME = "analytics_report.pdf"

  attr_reader :user, :html_report, :pdf_report

  def initialize(user_id)
    @user = User.find(user_id)
  end

  def process
    broadcast_progress(t("report.render"), 25)
    load_html_report

    broadcast_progress(t("report.generate"), 50)
    generate_pdf

    broadcast_progress(t("report.upload"), 75)
    attach_pdf

    broadcast_progress(t("report.attach"), 100)
  end

  private

    def load_html_report
      articles = user.site.articles.published.order(visit_count: :desc)
      @html_report = ApplicationController.render(
        assigns: {
          articles:
        },
        template: TEMPLATE_PATH,
        layout: "pdf"
      )
    end

    def generate_pdf
      @pdf_report = WickedPdf.new.pdf_from_string html_report
    end

    def attach_pdf
      user.report.purge_later if user.report.attached?

      user.report.attach(
        io: StringIO.new(pdf_report), filename: FILE_NAME,
        content_type: "application/pdf")
      user.save
    end

    def broadcast_progress(message, progress)
      ActionCable.server.broadcast(user.id, { message:, progress: })
    end
end
