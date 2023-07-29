import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { formattedDateTime } from "../utils";

const Item = ({ version, handleRestore, isCreated }) => {
  const { t } = useTranslation();

  const { id, createdAt, event } = version;
  const formattedDate = formattedDateTime(createdAt);

  if (isCreated) {
    return (
      <Typography className="neeto-ui-bg-gray-100 w-full p-3" style="body2">
        {t("articles.versions.created", {
          date: formattedDate,
          event,
        })}
      </Typography>
    );
  }

  return (
    <div
      className="neeto-ui-bg-gray-100 flex w-full cursor-pointer flex-col p-3"
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
