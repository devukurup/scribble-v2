# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @user = create(:user, site: @site)
  end

  def test_should_get_successfully_from_root_url
    get root_path

    assert_response :success
  end

  def test_redirection_to
    redirection = create(:redirection, from: "/from_path", to: "/to_path", site: @site)

    get(redirection.from)

    assert_redirected_to redirection.redirect_url
  end
end
