# frozen_string_literal: true

module ApplicationHelper
  def get_global_props(current_user)
    global_props = { user: current_user }
  end
end
