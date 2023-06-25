# frozen_string_literal: true

require "test_helper"

class Api::V1::Public::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site, password: "welcome123")
  end

  def test_should_login_with_valid_site_password
    post(api_v1_public_sessions_path, params: {  site: { password: @site.password }, }, headers:)

    assert_response :success
    assert_equal @site.authentication_token, response_json["authentication_token"]
  end

  def test_should_not_login_with_invalid_site_password
    post(api_v1_public_sessions_path, params: {  site: { password: "incorrect password" }, }, headers:)

    assert_response :unauthorized
    assert_equal t("session.incorrect_password"), response_json["error"]
  end

end
