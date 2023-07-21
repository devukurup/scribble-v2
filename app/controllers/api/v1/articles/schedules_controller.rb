# frozen_string_literal: true

class Api::V1::Articles::SchedulesController < ApplicationController
  before_action :load_article!
  before_action :load_schedule, only: %i[show destroy]

  def show
    render
  end

  def create
    @article.create_schedule!(schedule_params)

    render_notice(t("success.created", entity: Schedule.model_name.human))
  end

  def destroy
    @schedule.destroy!

    render_notice(t("success.deleted", entity: Schedule.model_name.human))
  end

  private

    def load_article!
      @article = @site.articles.find(params[:article_id])
    end

    def load_schedule
      @schedule = @article.schedule
    end

    def schedule_params
      params.require(:schedule).permit(:time, :event)
    end
end
