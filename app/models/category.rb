# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 255

  validates :title, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: MAX_TITLE_LENGTH }
end
