# frozen_string_literal: true

require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_should_show_site
    get site_path, headers: headers()

    assert_response :success
    assert_equal @site.title, response_json["site"]["title"]
  end

  def test_should_update_site
    new_title = "Updated title"
    put site_path, params: { site: { title: new_title } }, headers: headers()

    assert_response :success
    assert_equal new_title, @site.reload.title
  end
end
