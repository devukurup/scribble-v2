import React from "react";

import { Formik, Form } from "formik";
import { Button, PageLoader, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import { useLoginSession } from "hooks/reactQuery/public/useSessionApi";
import { useShowSite } from "hooks/reactQuery/useSiteApi";
import { capitalize } from "neetocommons/pure";
import { setToSessionStorage } from "utils/storage";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import NavBar from "./NavBar";

const Login = () => {
  const { isLoading, data: { site } = {} } = useShowSite();

  const { t } = useTranslation();

  const handleSuccess = ({ authenticationToken }) => {
    if (authenticationToken) {
      setToSessionStorage({ authToken: authenticationToken });
      window.location.href = routes.public.articles.index;
    }
  };

  const { mutate: loginSession, isLoading: isLoggingIn } = useLoginSession({
    onSuccess: handleSuccess,
  });

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar title={site?.title} />
      <div className=" mx-auto flex h-full w-96 flex-col justify-center space-y-10">
        <div className="flex flex-col space-y-1">
          <Typography style="h2">
            {t("public.login.title", { title: site?.title })}
          </Typography>
          <Typography className="neeto-ui-text-gray-600" style="body1">
            {t("public.login.description", { title: site?.title })}
          </Typography>
        </div>
        <Formik
          validateOnBlur
          validateOnChange
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={loginSession}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div className="flex flex-col space-y-3">
                <Input
                  label={capitalize(t("common.password"))}
                  name="password"
                  placeholder={t("public.login.placeholder")}
                  size="large"
                  type="password"
                />
                <Button
                  className="justify-center"
                  disabled={isLoggingIn || !isValid || !dirty}
                  label={t("public.login.continue")}
                  size="large"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
