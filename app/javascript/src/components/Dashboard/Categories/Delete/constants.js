import { SINGULAR } from "constants";

import { t } from "i18next";
import * as yup from "yup";

import { toLabelAndValue, capitalize } from "neetocommons/pure";

export const INITIAL_VALUES = {
  category: toLabelAndValue(""),
};

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup.object().required(
    t("validations.required", {
      field: capitalize(t("common.category", SINGULAR)),
    })
  ),
});
