import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { formattedDateTime } from "../utils";

const Item = ({ version, handleRestore }) => {
  const { id, createdAt, event } = version;

  const { t } = useTranslation();

  return (
    <div
      className="neeto-ui-bg-gray-100 w-full cursor-pointer p-3"
      onClick={() => handleRestore(id)}
    >
      <Typography style="h4" weight="semibold">
        {t("articles.versions.event", { event })}
      </Typography>
      <Typography style="body3">{formattedDateTime(createdAt)}</Typography>
    </div>
  );
};

export default Item;
