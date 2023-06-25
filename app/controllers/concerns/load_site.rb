# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  private

    def load_site!
      @site = Site.first!
    end
end
