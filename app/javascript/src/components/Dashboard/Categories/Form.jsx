import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Modal } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { INITIAL_TOUCHED, VALIDATION_SCHEMA } from "./constants";

const Form = ({ initialValues, onClose, handleSubmit, isEdit = false }) => {
  const { t } = useTranslation();

  return (
    <Formik
      validateOnBlur
      validateOnChange
      initialTouched={INITIAL_TOUCHED}
      initialValues={initialValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
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
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
              label={
                isEdit
                  ? t("category.saveChanges")
                  : t("category.addButtonLabel")
              }
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
