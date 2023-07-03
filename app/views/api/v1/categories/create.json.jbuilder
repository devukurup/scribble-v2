# frozen_string_literal: true

json.category do
  json.extract! @category, :id, :title
end

json.notice t("successfully_created", entity: "Category")
