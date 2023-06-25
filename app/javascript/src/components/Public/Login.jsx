import { Button, PageLoader, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import React from "react";
import NavBar from "./NavBar";
import { useShowSite } from "hooks/useShowSite";
import { Formik, Form } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import sessionsApi from "apis/public/sessions";
import { setToSessionStorage } from "helpers/session";
import routes from "src/routes";
import { useTranslation } from "react-i18next";

const Login = () => {
  const {
    isLoading,
    data: { site },
  } = useShowSite();

  const { t } = useTranslation();

  const handleSubmit = async values => {
    try {
      const { data } = await sessionsApi.login({
        site: { password: values.password },
      });
      const authToken = data?.authentication_token;
      if (authToken) {
        setToSessionStorage({ authToken });
        window.location.href = routes.public.articles;
      }
    } catch (error) {
      logger.error(error);
    }
  };

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
          onSubmit={handleSubmit}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form>
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder={t("public.login.placeholder")}
                  label={t("common.password")}
                  type="password"
                  name="password"
                  size="large"
                />
                <Button
                  label={t("public.login.continue")}
                  className="justify-center"
                  size="large"
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
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
