# frozen_string_literal: true

class Articles::UpdateService
  attr_reader :schedule_id, :schedule

  def initialize(schedule_id)
    @schedule_id = schedule_id
  end

  def process!
    load_schedule!
    update_article!
    destroy_schedule!
  rescue ActiveRecord::RecordNotFound
  end

  private

    def load_schedule!
      @schedule = Schedule.includes(:article).find(schedule_id)
    end

    def update_article!
      schedule.article.published! and return if schedule.publish?

      schedule.article.draft! if schedule.unpublish?
    end

    def destroy_schedule!
      schedule.destroy!
    end
end
