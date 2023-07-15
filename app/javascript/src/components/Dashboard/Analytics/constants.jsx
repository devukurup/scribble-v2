import React from "react";

import { t } from "i18next";
import { Typography, Button } from "neetoui";
import { TITLE_TRUNCATE_LENGTH } from "src/constants";
import routes from "src/routes";
import { formattedDate, truncate } from "src/utils";

import { buildUrl } from "neetocommons/utils";

export const COLUMN_DATA = [
  {
    key: "title",
    dataIndex: "title",
    title: t("common.title"),
    width: 200,
    render: (title, { slug }) => (
      <Button
        label={truncate(title)}
        style="link"
        target="_blank"
        to={buildUrl(routes.public.articles.show, { slug })}
        tooltipProps={
          title.length > TITLE_TRUNCATE_LENGTH && { content: title }
        }
      />
    ),
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
    sorter: true,
  },
];

export const SORT_OPTIONS = {
  descend: "desc",
  ascend: "asc",
};

export const DEFAULT_SORT_OPTION = "desc";
