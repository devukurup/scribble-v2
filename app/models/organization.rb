# frozen_string_literal: true

class Organization < ApplicationRecord
  MINIMUM_PASSWORD_LENGTH = 6
  MAX_NAME_LENGTH = 100
  VALID_NAME_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/
  VALID_PASSWORD_REGEX = /\A(?=.*\d)(?=.*?[A-Za-z]).+\z/

  has_one :user

  has_secure_password validations: false

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH },
    format: { with: VALID_NAME_REGEX }
  validates :password, length: { minimum: MINIMUM_PASSWORD_LENGTH }, format: { with: VALID_PASSWORD_REGEX }, if: -> {
 password.present? }
end
