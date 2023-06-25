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
    assert Redirection.count, response_json["redirections"].count
  end

  def test_should_create_valid_redirection
    post(api_v1_redirections_path, params: redirection_params, headers:)

    assert_response :success
    assert_equal response_json["notice"], t("successfully_created", entity: "Redirection")
  end

  def test_should_destroy_redirection
    assert_difference "Redirection.count", -1 do
      delete(api_v1_redirection_path(@redirection.id), headers:)
    end

    assert_response :ok
  end

  def test_should_update_redirection
    put(api_v1_redirection_path(@redirection.id), params: redirection_params, headers:)

    assert_response :success
    assert_equal redirection_params.dig(:redirection, :from), @redirection.reload.from
    assert_equal redirection_params.dig(:redirection, :to), @redirection.reload.to
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
