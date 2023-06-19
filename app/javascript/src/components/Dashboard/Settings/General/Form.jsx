import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Formik, Form as FormikForm } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  INITIAL_TOUCHED,
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
} from "./constants";

const Form = () => {
  const { t } = useTranslation();

  const handleSubmit = () => {};

  return (
    <Formik
      validateOnBlur
      validateOnChange
      initialTouched={INITIAL_TOUCHED}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <FormikForm noValidate>
          <div className="mt-8 flex flex-col space-y-5">
            <Input
              label={t("settings.generalSettings.inputLabel")}
              name="title"
              placeholder={t("settings.generalSettings.placeholder")}
            />
            <Typography className="neeto-ui-text-gray-600" style="body3">
              {t("settings.generalSettings.inputDescription")}
            </Typography>
            <div className="flex space-x-3">
              <Button
                disabled={isSubmitting || !isValid || !dirty}
                label={t("common.saveChanges")}
                type="submit"
              />
              <Button label={t("common.cancel")} style="text" type="reset" />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
