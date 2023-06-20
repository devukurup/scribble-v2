import { isEditorEmpty } from "@bigbinary/neeto-editor";
import { t } from "i18next";
import * as yup from "yup";

export const STATUSES = [
  {
    label: t("statuses.all"),
    count: 10,
  },
  {
    label: t("statuses.published"),
    count: 20,
  },
  {
    label: t("statuses.draft"),
    count: 30,
  },
];

export const EDITOR_ADDONS = [
  "highlight",
  "code-block",
  "block-quote",
  "divider",
  "paste-unformatted",
  "undo",
  "redo",
];

export const VALID_TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9& -]*$/;

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validations.required", { field: t("common.title") }))
    .max(255, t("validations.maximumLength", { field: t("common.title") }))
    .matches(
      VALID_TITLE_REGEX,
      t("validations.invalidPattern", { field: t("common.title") })
    ),
  body: yup
    .string()
    .test(
      "body",
      t("validations.required", { field: t("common.description") }),
      value => !isEditorEmpty(value)
    ),
  category: yup
    .object()
    .required(t("validations.required", { field: t("common.category") })),
});

export const INITIAL_VALUES = {
  body: "<p></p>",
  title: "",
  category: "",
};

export const STATUS = {
  Publish: "published",
  "Save as draft": "draft",
};

export const DEFAULT_PAGE_NUMBER = 1;
export const PAGINATION_LIMIT = 10;
