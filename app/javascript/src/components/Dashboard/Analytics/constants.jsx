import React from "react";

import { t } from "i18next";
import { Typography } from "neetoui";
import { formattedDate } from "src/utils";

export const COLUMN_DATA = [
  {
    key: "title",
    dataIndex: "title",
    title: t("common.title"),
    width: 200,
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    title: t("analytics.table.createdAt"),
    render: createdAt => (
      <Typography style="body2">{formattedDate(createdAt)}</Typography>
    ),
    width: 50,
  },
  {
    key: "category",
    dataIndex: "category",
    title: t("analytics.table.category"),
    width: 100,
  },
  {
    key: "visitCount",
    dataIndex: "visitCount",
    title: t("analytics.table.visits"),
    width: 20,
  },
];
