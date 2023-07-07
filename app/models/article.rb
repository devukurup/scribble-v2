# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 250
  VALID_TITLE_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :site
  belongs_to :user
  belongs_to :category, counter_cache: true

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates_presence_of :body, :status
  validates :slug, presence: true, uniqueness: true

  before_validation :set_slug!, if: :title_changed?

  before_save :set_last_published_at

  private

    def set_slug!
      title_slug = title.parameterize
      latest_article_slug = Article.where(
        "slug ~* ?",
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def set_last_published_at
      if status_changed? && status_was == "draft"
        self.last_published_at = DateTime.now
      end
    end
end
