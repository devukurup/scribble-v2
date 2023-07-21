import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const STATUS_OPTIONS = ["draft", "unpublishLater"];

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
  },
  {
    label: t("statuses.saveDraft"),
    value: ARTICLE_STATUSES.draft,
  },
  {
    label: t("statuses.later.publish"),
    value: ARTICLE_STATUSES.publishLater,
    event: "publish",
  },
  {
    label: t("statuses.later.unpublish"),
    value: ARTICLE_STATUSES.unpublishLater,
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
