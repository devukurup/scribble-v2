# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect

  def index
    render
  end

  private

    def redirect
      redirection = Redirection.find_by(from: request.path)

      redirect_to(redirection.redirect_url, status: 301, allow_other_host: true) if redirection.present?
    end
end
