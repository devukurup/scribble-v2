# frozen_string_literal: true

class Site < ApplicationRecord
  MINIMUM_PASSWORD_LENGTH = 6
  MAX_TITLE_LENGTH = 100
  VALID_TITLE_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/
  VALID_PASSWORD_REGEX = /\A(?=.*\d)(?=.*?[A-Za-z]).+\z/

  has_one :user

  has_secure_password validations: false

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates :password, length: { minimum: MINIMUM_PASSWORD_LENGTH }, format: { with: VALID_PASSWORD_REGEX }, if: -> {
 password.present? }
end
