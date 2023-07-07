# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  included do
    before_action :load_current_user!
  end

  private

    def load_current_user!
      @current_user = @site.users.first!
    end
end
