import { t } from "i18next";
import * as yup from "yup";

import { SINGULAR } from "constants";
import { capitalize } from "neetocommons/pure";

export const INITIAL_VALUES = {
  category: { value: "", label: "" },
};

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup.object().required(
    t("validations.required", {
      field: capitalize(t("common.category", SINGULAR)),
    })
  ),
});
