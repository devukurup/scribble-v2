import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const ARTICLE_STATUSES = {
  published: "published",
  draft: "draft",
  publishLater: "publishLater",
  unpublishLater: "unpublishLater",
};

export const STATUS_DROPDOWN_MENU = [
  {
    label: t("statuses.publish"),
    value: ARTICLE_STATUSES.published,
    pattern: { status: ARTICLE_STATUSES.draft },
  },
  {
    label: t("statuses.saveDraft"),
    value: ARTICLE_STATUSES.draft,
    pattern: { status: ARTICLE_STATUSES.published },
  },
  {
    label: t("statuses.later.publish"),
    value: ARTICLE_STATUSES.publishLater,
    pattern: { articleStatus: ARTICLE_STATUSES.draft, isEdit: true },
    event: "publish",
  },
  {
    label: t("statuses.later.unpublish"),
    value: ARTICLE_STATUSES.unpublishLater,
    pattern: { articleStatus: ARTICLE_STATUSES.published, isEdit: true },
    event: "unpublish",
  },
];

export const VALIDATION_SCHEMA = yup.object().shape({
  date: yup
    .date()
    .min(dayjs().startOf("day"), t("validations.notInPast", { entity: "Date" }))
    .nullable()
    .required(t("validations.required", { field: "Date" })),
  time: yup
    .date()
    .when("date", (date, schema) => {
      if (dayjs().isSame(date, "date")) {
        return schema.test({
          name: "notInPast",
          message: t("validations.notInPast", { entity: "Time" }),
          test: time => dayjs(time)?.isAfter(dayjs()),
        });
      }

      return schema;
    })
    .nullable()
    .required(t("validations.required", { field: "Time" })),
});

export const INITIAL_VALUES = {
  date: null,
  time: null,
};

export const TIME_FORMAT = "hh:mm";

export const EDITOR_ADDONS = [
  "highlight",
  "code-block",
  "block-quote",
  "divider",
  "paste-unformatted",
];
export const DEFAULT_ROW_COUNT = 1;

export const TITLE_BODY_KEYS = ["title", "body"];
