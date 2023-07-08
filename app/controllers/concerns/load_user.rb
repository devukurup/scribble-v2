# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  private

    def load_current_user!
      @current_user = @site.users.first!
    end
end
