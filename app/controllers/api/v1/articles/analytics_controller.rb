# frozen_string_literal: true

class Api::V1::Articles::AnalyticsController < ApplicationController
  before_action :load_current_user!
  before_action :load_published_articles, only: :index

  def index
    @total_count = @articles.size
    @articles = @articles.includes(:category)
      .order(visit_count: params[:order])
      .page(params[:page]).per(params[:limit])
  end

  def generate_pdf
    GenerateReportPdfWorker.perform_async(@current_user.id)
  end

  def download_pdf
    unless @current_user.report.attached?
      render_error(t("not_found", entity: "report"), :not_found) and return
    end

    send_data @current_user.report.download, filename: Articles::ReportPdfService::FILE_NAME, content_type: "application/pdf"
  end

  private

    def load_published_articles
      @articles = @site.articles.published
    end
end
