import { t } from "i18next";
import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 6;
const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Za-z]).+$/;
const COUNT_LIMIT = 1;

export const VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      t("validations.minPasswordCharacters", { count: MIN_PASSWORD_LENGTH })
    )
    .matches(
      VALID_PASSWORD_REGEX,
      t("validations.invalidPassword", {
        letterCount: COUNT_LIMIT,
        digitCount: COUNT_LIMIT,
      })
    ),
});

export const DEFAULT_PASSWORD = "******";
export const INITIAL_VALUE = { password: "" };

export const VALIDATION_MESSAGES = [
  t("validations.minPasswordCharacters", { count: MIN_PASSWORD_LENGTH }),
  t("validations.invalidPassword", {
    letterCount: COUNT_LIMIT,
    digitCount: COUNT_LIMIT,
  }),
];
