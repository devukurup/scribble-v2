import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Typography, Spinner } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import { INITIAL_TOUCHED, VALIDATION_SCHEMA } from "./constants";

const Form = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const fetchSite = async () => {
    try {
      setIsLoading(true);
      const {
        data: { site },
      } = await siteApi.show();
      setTitle(site.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSite();
  }, []);

  const handleSubmit = async values => {
    try {
      await siteApi.update(values);
      fetchSite();
    } catch (error) {
      logger.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Formik
      validateOnBlur
      validateOnChange
      initialTouched={INITIAL_TOUCHED}
      initialValues={{ title }}
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
