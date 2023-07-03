import React from "react";

import { useTranslation } from "react-i18next";

import Table from "./Table";

import Wrapper from "../Wrapper";

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
