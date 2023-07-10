import React from "react";

import { useTranslation } from "react-i18next";

import Wrapper from "Dashboard/Settings/Wrapper";

import Table from "./Table";

const Redirections = () => {
  const { t } = useTranslation();

  return (
    <Wrapper
      description={t("settings.redirections.description")}
      title={t("settings.redirections.title")}
    >
      <Table />
    </Wrapper>
  );
};

export default Redirections;
