# frozen_string_literal: true

class Category < ApplicationRecord
  scope :with_published_articles, -> { joins(:articles).where(articles: { status: :published }).distinct }

  MAX_TITLE_LENGTH = 255
  VALID_TITLE_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/
  GENERAL_CATEGORY_TITLE = "General"

  acts_as_list scope: :site

  belongs_to :site

  has_many :articles

  validates :title, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
end
