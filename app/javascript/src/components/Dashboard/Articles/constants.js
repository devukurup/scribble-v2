import { t } from "i18next";
import { isEditorEmpty } from "neetoeditor";
import * as yup from "yup";

import { SINGULAR } from "constants";
import { capitalize } from "neetocommons/pure";

export const ARTICLE_STATUSES = {
  all: "all",
  published: "published",
  draft: "draft",
};

export const DEFAULT_ACTIVE_STATUS = ARTICLE_STATUSES.all;

export const INITIAL_FILTERS = {
  activeStatus: DEFAULT_ACTIVE_STATUS,
  searchTerm: "",
  selectedCategories: [],
};

export const EDITOR_ADDONS = [
  "highlight",
  "code-block",
  "block-quote",
  "divider",
  "paste-unformatted",
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
  category: yup.object().required(
    t("validations.required", {
      field: capitalize(t("common.category", SINGULAR)),
    })
  ),
});

export const INITIAL_VALUES = {
  body: "<p></p>",
  title: "",
  category: "",
};

export const STATUS = {
  Publish: t("statuses.published").toLowerCase(),
  "Save as draft": t("statuses.draft").toLowerCase(),
};

export const COLUMNS = [
  {
    label: t("common.title"),
    key: "title",
    checked: true,
    disabled: true,
  },
  {
    label: t("common.category", SINGULAR),
    key: "category",
    checked: true,
    disabled: false,
  },
  {
    label: t("dashboard.table.author"),
    key: "author",
    checked: true,
    disabled: false,
  },
  {
    label: t("dashboard.table.lastPublishedAt"),
    key: "lastPublishedAt",
    checked: true,
    disabled: false,
  },
  {
    label: t("common.status"),
    key: "status",
    checked: true,
    disabled: false,
  },
];

export const SINGLE_ARTICLE_COUNT = 1;

export const DEFAULT_ROW_COUNT = 1;

export const KEYBOARD_ENTER_KEY = "Enter";

export const ACTION_KEY = "action";

export const TITLE_BODY_KEYS = ["title", "body"];
