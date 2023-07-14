# frozen_string_literal: true

json.versions @versions do |version|
  json.extract! version, :id, :event, :created_at
end
