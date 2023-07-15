import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { CREATED_VERSION_EVENT } from "./constants";

import { formattedDateTime } from "../utils";

const Item = ({ version, handleRestore }) => {
  const { id, createdAt, event } = version;
  const formattedDate = formattedDateTime(createdAt);
  const { t } = useTranslation();

  if (event === CREATED_VERSION_EVENT) {
    return (
      <Typography className="neeto-ui-bg-gray-100 w-full p-3" style="body2">
        {t("articles.versions.created", {
          dateString: formattedDate,
        })}
      </Typography>
    );
  }

  return (
    <div
      className="neeto-ui-bg-gray-100 w-full cursor-pointer p-3"
      onClick={() => handleRestore(id)}
    >
      <Typography style="h4" weight="semibold">
        {t("articles.versions.event", { event })}
      </Typography>
      <Typography style="body3">{formattedDate}</Typography>
    </div>
  );
};

export default Item;
