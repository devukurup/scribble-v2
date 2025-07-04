# frozen_string_literal: true

class Api::V1::SitesController < ApplicationController
  def show
    render
  end

  def update
    @site.update!(site_params)

    render_notice(t("success.updated", entity: Site.model_name.human))
  end

  private

    def site_params
      params.require(:site).permit(:title, :password)
    end
end
