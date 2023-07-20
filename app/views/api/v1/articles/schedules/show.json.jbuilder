# frozen_string_literal: true

json.schedule do
  json.extract! @schedule, :time, :event
end
