# frozen_string_literal: true

class Api::V1::Public::SessionsController < ApplicationController
  def create
    unless @site.authenticate(site_params[:password])
      render_error(t("session.incorrect_password"), :unauthorized)
    end
  end

  private

    def site_params
      params.require(:site).permit(:password)
    end
  end