# frozen_string_literal: true

class ArticleUpdateWorker
  include Sidekiq::Worker

  def perform(schedule_id)
    Articles::UpdateService.new(schedule_id).process!
  end
end
