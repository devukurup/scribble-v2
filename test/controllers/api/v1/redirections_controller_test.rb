# frozen_string_literal: true

require "test_helper"

class Api::V1::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = create(:site)
    @redirection = create(:redirection, site: @site)
  end

  def test_should_list_all_redirections
    get(api_v1_redirections_path, headers:)

    assert_response :success
    assert @site.redirections.pluck(:id), response_ids(response_json["redirections"])
  end

  def test_should_create_redirection
    post(api_v1_redirections_path, params: redirection_params, headers:)

    assert_response :success
    assert_equal t("success.created", entity: "Redirection"), response_json["notice"]
  end

  def test_error_response_on_creating_redirection_with_invalid_params
    params = {
      redirection: { from: "", to: "" }
    }

    post(api_v1_redirections_path, params:, headers:)

    assert_response :unprocessable_entity
  end

  def test_should_destroy_redirection
    assert_difference "@site.redirections.count", -1 do
      delete(api_v1_redirection_path(@redirection.id), headers:)
    end

    assert_response :success
    assert_not @site.redirections.exists?(@redirection.id)
  end

  def test_error_response_on_invalid_redirection_id
    delete(api_v1_redirection_path("invalid_id"), headers:)

    assert_response :not_found
  end

  def test_should_update_redirection
    put(api_v1_redirection_path(@redirection.id), params: redirection_params, headers:)

    assert_response :success
    assert_equal redirection_params[:redirection][:from], @redirection.reload.from
    assert_equal redirection_params[:redirection][:to], @redirection.reload.to
  end

  private

    def redirection_params
      {
        redirection: {
          from: "/articles/scribble",
          to: "/articles/doctors_in_town"
        }
      }
    end
end
