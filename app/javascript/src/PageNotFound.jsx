import React from "react";

import { t } from "i18next";
import { Button } from "neetoui";

import ErrorImage from "images/404";

const PageNotFound = ({ route }) => (
  <div className="mx-auto flex h-screen w-2/3 flex-col items-center justify-center space-y-5">
    <img alt={t("common.errorImage")} className="ml-5" src={ErrorImage} />
    <Button
      label={t("common.redirectToHome")}
      size="large"
      onClick={() => (window.location.href = route)}
    />
  </div>
);

export default PageNotFound;
