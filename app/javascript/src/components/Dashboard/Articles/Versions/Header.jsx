import React from "react";

import { Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

const Header = ({ title }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography style="h2" weight="semibold">
        {t("articles.versions.title")}
      </Typography>
      <Typography className="neeto-ui-text-gray-500" style="body3">
        <Trans
          components={{ bold: <strong /> }}
          defaults={t("articles.versions.description", { title })}
        />
      </Typography>
    </>
  );
};

export default Header;
