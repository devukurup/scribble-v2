# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_TO_REGEX = /\A(?:(?:https?:\/\/|www\.)[\w.-]+(?:\.[\w.-]+)+(?:\/[\w.\/-]*)*|\/[\w.\/-]+)\z/
  VALID_FROM_REGEX = /\A\/[\w.\/-]*\z/
  MAX_FROM_LENGTH = 300
  MAX_TO_LENGTH = 500

  belongs_to :site

  validates :from, presence: true, uniqueness: true, length: { maximum: MAX_FROM_LENGTH },
    format: { with: VALID_FROM_REGEX }
  validates :to, presence: true, length: { maximum: MAX_TO_LENGTH }, format: { with: VALID_TO_REGEX }
  validate :unique_from_and_to
  validate :no_cyclic_redirection

  def redirect_url
    return to unless to.start_with?("www.")

    "https://#{to}"
  end

  private

    def unique_from_and_to
      errors.add(:from, t("errors.redirection.non_unique")) if from == to
    end

    def no_cyclic_redirection(to = self.to)
      next_to = site.redirections.find_by(from: to)&.to unless site.nil?

      return if next_to.nil?

      if next_to == from
        errors.add(:redirection, t("errors.redirection.cyclic"))
      else
        no_cyclic_redirection(next_to)
      end
    end
end
