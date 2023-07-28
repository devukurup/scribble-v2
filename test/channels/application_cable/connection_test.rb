# frozen_string_literal: true

require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @user = create(:user)
  end

  def test_connection_success_on_valid_email
    connect params: { email: @user.email }

    assert_equal connection.current_user, @user
  end

  def test_connection_fails_when_credentials_are_empty
    assert_reject_connection { connect }
  end

  def test_connection_fails_on_invalid_user
    assert_reject_connection {
      connect params: { email: "test@example.com" }
    }
  end
end
