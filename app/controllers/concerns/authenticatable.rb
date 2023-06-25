# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  private

    def authenticate_site_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(
        @site.authentication_token,
        auth_token)

      unless is_valid_token
        render_error(t("session.could_not_auth"), :unauthorized)
      end
    end

    def is_authenticatable
      @site.password_digest.present?
    end
end
