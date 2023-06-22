# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization, only: %i[show update]

  def show
    render
  end

  def update
    @organization.update!(organization_params)
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password)
    end
end
