import { t } from "i18next";
import * as yup from "yup";

export const INITIAL_VALUES = {
  category: { value: "", label: "" },
};

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .object()
    .required(t("validations.required", { field: t("common.category") })),
});
