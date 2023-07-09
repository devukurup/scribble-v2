# frozen_string_literal: true

class Api::V1::RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[destroy update]

  def create
    @site.redirections.create!(redirection_params)

    render_notice(t("success.created", entity: "Redirection"))
  end

  def index
    @redirections = @site.redirections.order(:created_at)
  end

  def update
    @redirection.update!(redirection_params)

    render_notice(t("success.updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!

    render_notice(t("success.deleted", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = @site.redirections.find(params[:id])
    end
end
