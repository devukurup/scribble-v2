# frozen_string_literal: true

class ArticleScheduleWorker
  include Sidekiq::Worker

  def perform
    Articles::ScheduleService.new.process
  end
end
