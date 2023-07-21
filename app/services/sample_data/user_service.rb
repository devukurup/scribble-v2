# frozen_string_literal: true

class SampleData::UserService < SampleData::Base
  USER_ATTRIBUTES = { first_name: "Oliver", last_name: "Smith", email: "oliver@example.com" }

  def process!
    create_user!
  end

  private

    def create_user!
      current_site.users.create! USER_ATTRIBUTES
    end
end
