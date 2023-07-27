# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 50
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  belongs_to :site

  has_many :articles
  has_one_attached :report

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: MAX_NAME_LENGTH }

  before_validation :email_to_lowercase!

  def name
    [first_name, last_name].join(" ").strip
  end

  private

    def email_to_lowercase!
      email.downcase!
    end
end
