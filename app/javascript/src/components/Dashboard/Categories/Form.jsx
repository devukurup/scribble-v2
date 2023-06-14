import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Modal } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { VALIDATION_SCHEMA } from "./constants";

const Form = ({ initialValues, onClose, handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm noValidate>
          <Modal.Body className="space-y-2">
            <Input
              required
              label={t("category.inputLabel")}
              name="title"
              placeholder={t("category.placeholder")}
            />
          </Modal.Body>
          <Modal.Footer className="space-x-2">
            <Button
              disabled={isSubmitting}
              label={t("category.addButtonLabel")}
              type="submit"
            />
            <Button
              label={t("common.cancel")}
              style="text"
              type="reset"
              onClick={onClose}
            />
          </Modal.Footer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
