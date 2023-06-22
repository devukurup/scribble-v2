# frozen_string_literal: true

module LoadOrganization
  extend ActiveSupport::Concern

  private

    def load_organization
      @organization = Organization.first!
    end
end
