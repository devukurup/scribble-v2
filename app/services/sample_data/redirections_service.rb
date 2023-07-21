# frozen_string_literal: true

class SampleData::RedirectionsService < SampleData::Base
  REDIRECTION_COUNT = 2

  def process!
    create_redirections!
  end

  private

    def create_redirections!
      REDIRECTION_COUNT.times do
        create_redirection!
      end
    end

    def create_redirection!
      redirection_attributes = { from: "/#{Faker::Lorem.unique.word}", to: "/#{Faker::Lorem.unique.word}" }
      current_site.redirections.create! redirection_attributes
    end
end
