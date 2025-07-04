import { t } from "i18next";
import * as yup from "yup";

const MAX_TITLE_LENGTH = 255;
const VALID_TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9& -]*$/;

export const INITIAL_VALUES = {
  title: "",
};

export const CATEGORY_VALIDATION_SCHEMA = yup
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
  );

export const VALIDATION_SCHEMA = yup.object().shape({
  title: CATEGORY_VALIDATION_SCHEMA,
});

export const INITIAL_TOUCHED = {
  title: true,
};
