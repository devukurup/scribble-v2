# frozen_string_literal: true

class SampleData::SiteService < SampleData::Base
  SITE_ATTRIBUTES = { title: "Spinkart" }

  def process!
    create_site!
  end

  private

    def create_site!
      Site.create! SITE_ATTRIBUTES
    end
end
