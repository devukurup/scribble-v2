import { isEditorEmpty } from "@bigbinary/neeto-editor";
import { t } from "i18next";
import * as yup from "yup";

export const DEFAULT_ACTIVE_STATUS = t("statuses.all");

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
  category: { label: "", value: "" },
};

export const STATUS = {
  Publish: "published",
  "Save as draft": "draft",
};

export const COLUMNS = [
  {
    label: "Title",
    key: "title",
    checked: true,
    disabled: true,
  },
  {
    label: "Category",
    key: "category",
    checked: true,
    disabled: false,
  },
  {
    label: "Author",
    key: "author",
    checked: true,
    disabled: false,
  },
  {
    label: "Last published at",
    key: "last_published_at",
    checked: true,
    disabled: false,
  },
  {
    label: "Status",
    key: "status",
    checked: true,
    disabled: false,
  },
];
