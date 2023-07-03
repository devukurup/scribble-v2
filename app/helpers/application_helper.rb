# frozen_string_literal: true

module ApplicationHelper
  def get_global_props
    global_props = { user: @current_user }
  end
end
