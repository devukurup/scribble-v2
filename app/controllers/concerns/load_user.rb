# frozen_string_literal: true

module LoadUser
  extend ActiveSupport::Concern

  def current_user
    @_current_user ||= User.first!
  end
end
