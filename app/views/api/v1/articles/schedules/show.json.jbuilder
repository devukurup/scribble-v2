# frozen_string_literal: true

json.schedule @schedule&.slice(:time, :event)
