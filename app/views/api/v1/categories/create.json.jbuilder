# frozen_string_literal: true

json.category do
  json.partial! "api/v1/categories/category", category: @category
end

json.notice t("success.created", entity: Category.model_name.human)
