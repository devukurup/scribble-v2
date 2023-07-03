import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Row from "./Row";
import Cell from "./Row/Cell";

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row className="h-10 py-1">
      <Cell>
        <Typography
          className="neeto-ui-text-gray-600"
          style="body2"
          textTransform="uppercase"
          weight="semibold"
        >
          {t("settings.redirections.from").toUpperCase()}
        </Typography>
      </Cell>
      <Cell>
        <Typography
          className="neeto-ui-text-gray-600"
          style="body2"
          textTransform="uppercase"
          weight="semibold"
        >
          {t("settings.redirections.to").toUpperCase()}
        </Typography>
      </Cell>
      <Cell className="w-20" />
    </Row>
  );
};

export default Header;
