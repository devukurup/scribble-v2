# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiExceptions
end
