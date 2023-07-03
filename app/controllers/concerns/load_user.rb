# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  included do
    before_action :load_current_user
  end

  def load_current_user
    @current_user = User.first!
  end
end
