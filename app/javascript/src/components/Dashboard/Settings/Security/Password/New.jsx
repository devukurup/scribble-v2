import React, { useState } from "react";

import classnames from "classnames";
import { Formik, Form } from "formik";
import { Eye, Hide, Close, Check } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useUpdateSite } from "hooks/reactQuery/useSiteApi";
import { capitalize } from "neetocommons/pure";

import { INITIAL_VALUE, VALIDATION_MESSAGES } from "./constants";
import { validation } from "./utils";

const New = ({ handleCancel, toggleIsNewPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: update, isLoading: isUpdating } = useUpdateSite();

  const { t } = useTranslation();

  const handleSubmit = values => {
    update({ password: values.password }, { onSuccess: toggleIsNewPassword });
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange
      validateOnMount
      initialValues={INITIAL_VALUE}
      validate={validation}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, errors }) => (
        <Form noValidate>
          <div className="flex flex-col space-y-3">
            <Input
              className="w-3/4"
              error={false}
              label={capitalize(t("common.password"))}
              name="password"
              placeholder={t("common.enterPassword")}
              type={isPasswordVisible ? "text" : "password"}
              suffix={
                <Button
                  icon={isPasswordVisible ? Eye : Hide}
                  style="text"
                  onClick={() =>
                    setIsPasswordVisible(
                      isPasswordVisible => !isPasswordVisible
                    )
                  }
                />
              }
            />
            {VALIDATION_MESSAGES.map((message, index) => {
              const isErrorValid = errors.password?.includes(message);

              return (
                <div
                  key={index}
                  className={classnames("flex items-center space-x-1", {
                    "neeto-ui-text-gray-500": isErrorValid,
                    "neeto-ui-text-success-500": !isErrorValid,
                  })}
                >
                  {isErrorValid ? <Close size={15} /> : <Check size={15} />}
                  <Typography style="body3">{message}</Typography>
                </div>
              );
            })}
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
                onClick={handleCancel}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default New;
