import { t } from "i18next";

import { renderFormattedDate, renderTitleLink } from "./utils";

export const COLUMN_DATA = [
  {
    key: "title",
    dataIndex: "title",
    title: t("common.title"),
    width: 200,
    render: (title, { slug }) => renderTitleLink({ title, slug }),
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    title: t("analytics.table.createdAt"),
    render: createdAt => renderFormattedDate(createdAt),
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
    width: 60,
    sorter: true,
  },
];

export const SORT_OPTIONS = {
  descend: "desc",
  ascend: "asc",
};

export const DEFAULT_SORT_OPTION = SORT_OPTIONS.descend;

export const INITIAL_PROGRESS = 0;

export const FINAL_PROGRESS = 100;

export const FILE_NAME = "analytics_report.pdf";
