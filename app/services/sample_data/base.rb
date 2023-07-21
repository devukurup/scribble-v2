# frozen_string_literal: true

class SampleData::Base
  def current_site
    @_current_site ||= Site.first
    end

  def current_user
    @_current_user ||= current_site.users.first
  end

  def categories
    @_categories ||= current_site.categories
  end
end
