import { Button, PageLoader, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import React from "react";
import NavBar from "./NavBar";
import { useShowSite } from "hooks/reactQuery/useSiteApi";
import { capitalize } from "neetocommons/pure";
import { Formik, Form } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import { setToSessionStorage } from "helpers/session";
import routes from "src/routes";
import { useTranslation } from "react-i18next";
import { useLoginSession } from "hooks/reactQuery/public/useSessionApi";

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
          <Typography style="body1" className="neeto-ui-text-gray-600">
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
                  placeholder={t("public.login.placeholder")}
                  label={capitalize(t("common.password"))}
                  type="password"
                  name="password"
                  size="large"
                />
                <Button
                  label={t("public.login.continue")}
                  className="justify-center"
                  size="large"
                  type="submit"
                  disabled={isLoggingIn || !isValid || !dirty}
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
