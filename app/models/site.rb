# frozen_string_literal: true

class Site < ApplicationRecord
  MIN_PASSWORD_LENGTH = 6
  MAX_LENGTH = 128
  VALID_TITLE_REGEX = /\A[a-zA-Z][a-zA-Z0-9& -]*\z/
  VALID_PASSWORD_REGEX = /\A(?=.*\d)(?=.*?[A-Za-z]).+\z/

  with_options dependent: :destory do |site|
    has_many :users
    has_many :redirections
    has_many :categories, -> { order(position: :asc) }
    has_many :articles
  end

  validates :title, presence: true, uniqueness: true, length: { maximum: MAX_LENGTH },
    format: { with: VALID_TITLE_REGEX }
  validates :authentication_token, uniqueness: true
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH, maximum: MAX_LENGTH },
    format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? }

  has_secure_password validations: false
  has_secure_token :authentication_token
end
