# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_TITLE_LENGTH = 255
  VALID_TITLE_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/

  acts_as_list scope: :site

  has_many :articles
  belongs_to :site

  validates :title, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
end
