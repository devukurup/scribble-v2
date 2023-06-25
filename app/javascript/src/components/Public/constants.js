import { t } from "i18next";
import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(t("validations.required", { field: t("common.password") })),
});

export const INITIAL_VALUES = {
  password: "",
};
