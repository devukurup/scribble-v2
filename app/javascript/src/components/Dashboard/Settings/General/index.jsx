import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import Form from "./Form";

const General = () => {
  const { t } = useTranslation();

  return (
    <div className="m-32 flex w-full flex-col p-5">
      <Typography
        className="neeto-ui-text-gray-700"
        lineHeight="loose"
        style="h2"
        weight="semibold"
      >
        {t("settings.generalSettings.title")}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-600"
        lineHeight="normal"
        style="body1"
        weight="normal"
      >
        {t("settings.generalSettings.description")}
      </Typography>
      <Form />
    </div>
  );
};

export default General;
