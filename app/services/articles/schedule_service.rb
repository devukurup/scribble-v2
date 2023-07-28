# frozen_string_literal: true

class Articles::ScheduleService
  attr_reader :schedules

  def process
    load_schedules
    update_articles
  end

  private

    def load_schedules
      @schedules = Schedule.where(time: Time.zone.now.beginning_of_minute..Time.zone.now.end_of_minute)
    end

    def update_articles
      schedules.find_each do |schedule|
        ArticleUpdateWorker.perform_async(schedule.id)
      end
    end
end
