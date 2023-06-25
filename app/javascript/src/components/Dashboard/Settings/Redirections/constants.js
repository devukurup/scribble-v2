import * as yup from "yup";

export const FORM_INITIAL_VALUES = {
  from: "",
  to: "",
};

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  to: yup.string().trim().required("Required"),
  from: yup.string().trim().required("Required"),
});

export const ROOT_URL = "https://scribble.com/";

export const NEW_REDIRECTION = {
  id: "",
  from: "",
  to: "",
};
