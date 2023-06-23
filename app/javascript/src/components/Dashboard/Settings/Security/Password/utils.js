import { VALIDATION_SCHEMA } from "./constants";

export const validation = async values => {
  const errors = {};
  try {
    await VALIDATION_SCHEMA.validate(values, {
      abortEarly: false,
    });
  } catch ({ inner }) {
    inner.forEach(({ path, message }) => {
      errors[path] = (errors[path] || []).concat(message);
    });
  }

  return errors;
};
