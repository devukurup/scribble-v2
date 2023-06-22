# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_show_organization
    get organization_path, headers: headers()

    assert_response :success
    assert_equal @organization.name, response_json["organization"]["name"]
  end

  def test_should_update_organization
    new_name = "Updated name"
    put organization_path, params: { organization: { name: new_name } }, headers: headers()

    assert_response :success
    assert_equal new_name, @organization.reload.name
  end
end
