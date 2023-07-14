# frozen_string_literal: true

module Versionable
  extend ActiveSupport::Concern

  included do
    has_paper_trail

    before_save :set_paper_trail_event
    before_destroy :delete_version_entries
  end

  def restore!(version)
    self.paper_trail_event = "restored"
    attributes_to_set = version.attributes
      .except("updated_at")
      .merge({ status: "draft" })
    self.update!(attributes_to_set)
  end

  private

    def set_paper_trail_event
      unless self.paper_trail_event == "restored"
        self.paper_trail_event = self.status == "draft" ? "drafted" : "published"
      end
    end

    def delete_version_entries
      self.versions.destroy_all
    end
end
