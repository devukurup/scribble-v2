# frozen_string_literal: true

require "test_helper"

class Api::V1::SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
  end

  def test_should_show_site
    get(api_v1_site_path, headers:)

    assert_response :success
    assert_equal @site.title, response_json["site"]["title"]
  end

  def test_should_update_site
    new_title = "Updated title"
    put(api_v1_site_path, params: { site: { title: new_title } }, headers:)

    assert_response :success
    assert_equal new_title, @site.reload.title
  end
end
