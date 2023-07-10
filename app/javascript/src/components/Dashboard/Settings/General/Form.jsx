import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Typography, Spinner } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useShowSite, useUpdateSite } from "hooks/reactQuery/useSiteApi";

import { INITIAL_TOUCHED, VALIDATION_SCHEMA } from "./constants";

const Form = () => {
  const { data: { site } = {}, isLoading } = useShowSite();

  const { mutate: updateSite, isLoading: isUpdating } = useUpdateSite();

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Formik
      enableReinitialize
      validateOnBlur
      validateOnChange
      initialTouched={INITIAL_TOUCHED}
      initialValues={{ title: site.title }}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={updateSite}
    >
      {({ isValid, dirty }) => (
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
                disabled={isUpdating || !isValid || !dirty}
                label={t("common.saveChanges")}
                type="submit"
              />
              <Button
                disabled={!dirty}
                label={t("common.cancel")}
                style="text"
                type="reset"
              />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
