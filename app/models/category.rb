# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 255

  acts_as_list scope: :user

  belongs_to :user

  validates :title, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: MAX_TITLE_LENGTH }
end
