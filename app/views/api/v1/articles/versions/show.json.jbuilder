# frozen_string_literal: true

json.version do
  json.extract! @version, :id, :title, :body
  json.category @version.category&.title
end
