import * as yup from "yup";

export const INITIAL_VALUES = {
  title: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("required"),
});
