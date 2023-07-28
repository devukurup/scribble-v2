# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
    end

    private

      def find_user
        user = User.find_by(email: request.query_parameters[:email])

        return user if user.present?

        reject_unauthorized_connection
      end
  end
end
