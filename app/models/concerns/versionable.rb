# frozen_string_literal: true

module Versionable
  extend ActiveSupport::Concern
  VERSION_EVENTS = {
    restored: "restored",
    draft: "drafted",
    published: "published",
    created: "created"
  }.with_indifferent_access

  included do
    has_paper_trail

    before_save :set_paper_trail_event
    before_destroy :delete_version_entries
  end

  def restore!(version)
    self.paper_trail_event = VERSION_EVENTS[:restored]
    attributes_to_set = version.attributes
      .except("visit_count", "updated_at")
      .merge({ status: :draft })
    self.update!(attributes_to_set)
  end

  private

    def set_paper_trail_event
      self.paper_trail_event = VERSION_EVENTS[self.status] unless self.paper_trail_event == VERSION_EVENTS[:restored]
    end

    def delete_version_entries
      self.versions.destroy_all
    end
end
