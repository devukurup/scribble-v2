import { t } from "i18next";
import * as yup from "yup";

const VALID_TO_REGEX =
  /^(?:(?:https?:\/\/|www\.)[\w.-]+(?:\.[\w.-]+)+(?:\/[\w ./-]*)*|\/?[\w./-]+)$/;
export const VALID_PATH_REGEX = /^(?!www|https?:\/\/)\/?[\w/.-]*$/;

export const FORM_INITIAL_VALUES = {
  from: "",
  to: "",
};
export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  to: yup
    .string()
    .trim()
    .matches(VALID_TO_REGEX, t("validations.invalidToPath"))
    .required(
      t("validations.required", {
        field: t("settings.redirections.to"),
      })
    ),
  from: yup
    .string()
    .trim()
    .matches(VALID_PATH_REGEX, t("validations.invalidFromPath"))
    .required(
      t("validations.required", {
        field: t("settings.redirections.from"),
      })
    ),
});
export const ROOT_URL = `${window.location.protocol}//${window.location.host}`;

export const NEW_REDIRECTION = {
  id: "",
  from: "",
  to: "",
};

export const DEFAULT_SELECTED_REDIRECTION = {};

export const FROM_PATH_TRUNCATE_LENGTH = 20;

export const TO_PATH_TRUNCATE_LENGTH = 30;
