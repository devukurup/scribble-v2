import { t } from "i18next";
import * as yup from "yup";

const MAX_TITLE_LENGTH = 50;
const VALID_TITLE_REGEX = /^[a-zA-Z0-9 ]+$/;

export const INITIAL_VALUES = {
  title: "Spinkart",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validations.required", { field: t("common.title") }))
    .max(
      MAX_TITLE_LENGTH,
      t("validations.maximumLength", { field: t("common.title") })
    )
    .matches(
      VALID_TITLE_REGEX,
      t("validations.invalidPattern", { field: t("common.title") })
    ),
});

export const INITIAL_TOUCHED = {
  title: true,
};
