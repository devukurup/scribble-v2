# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  included do
    before_action :load_site!
  end

  private

    def load_site!
      @site = Site.first!
    end
end
