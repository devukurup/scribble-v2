import React from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Button, Typography, Dropdown } from "neetoui";
import { isEmpty } from "ramda";
import { TITLE_TRUNCATE_LENGTH, SINGULAR } from "src/constants";
import routes from "src/routes";
import { formattedDate, truncate } from "src/utils";

import { buildUrl } from "neetocommons/utils";

import {
  ARTICLE_STATUSES,
  DEFAULT_ACTIVE_STATUS,
  DRAFT_STATUS,
} from "./constants";

const { Menu, MenuItem } = Dropdown;

const renderActionDropdown = ({ row, handleDelete, handleUpdate }) => {
  const { status, id } = row;
  const publishStatus =
    status === DRAFT_STATUS ? t("statuses.publish") : t("statuses.unpublish");

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <Menu>
        <MenuItem.Button onClick={() => handleUpdate({ id, publishStatus })}>
          {publishStatus}
        </MenuItem.Button>
        <MenuItem.Button style="danger" onClick={() => handleDelete(row)}>
          {t("common.delete")}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export const formatCategories = categories =>
  categories?.map(({ title, id }) => ({ label: title, value: id }));

export const columnData = ({ handleDelete, handleUpdate }) => [
  {
    title: t("common.title"),
    dataIndex: "title",
    key: "title",
    width: 350,
    render: (title, { id }) => (
      <Button
        label={truncate(title)}
        style="link"
        to={buildUrl(routes.articles.edit, { articleId: id })}
        tooltipProps={
          title.length > TITLE_TRUNCATE_LENGTH && { content: title }
        }
      />
    ),
  },
  {
    title: t("common.category", SINGULAR),
    dataIndex: "category",
    key: "category",
    width: 200,
  },
  {
    title: t("dashboard.table.author"),
    dataIndex: "author",
    key: "author",
    width: 125,
  },
  {
    title: t("dashboard.table.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    width: 150,
    render: lastPublishedAt => (
      <Typography style="body2">
        {lastPublishedAt ? formattedDate(lastPublishedAt) : "-"}
      </Typography>
    ),
  },
  {
    title: t("common.status"),
    dataIndex: "status",
    key: "status",
    width: 100,
    render: status => (
      <Typography style="body2" textTransform="capitalize">
        {status}
      </Typography>
    ),
  },
  {
    dataIndex: "action",
    key: "action",
    width: 25,
    render: (_, row) =>
      renderActionDropdown({ row, handleDelete, handleUpdate }),
  },
];

export const buildUrlParams = ({ page, limit, search, status }) => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set("page", page);
  currentUrlParams.set("limit", limit);
  !isEmpty(search.trim())
    ? currentUrlParams.set("search", search)
    : currentUrlParams.delete("search");

  status !== ARTICLE_STATUSES.all
    ? currentUrlParams.set("status", status)
    : currentUrlParams.delete("status");

  return currentUrlParams;
};

export const formattedDateTime = dateTime =>
  dayjs(dateTime).format("h:mm A, D MMM YYYY");

export const getEmptyArticleProps = ({
  activeStatus,
  search,
  selectedCategories,
  totalCount,
  redirectToNewArticle,
  setFilters,
}) => {
  if (totalCount === 0) {
    return {
      title: t("empty.article.noArticle.title"),
      description: t("empty.article.noArticle.description"),
      label: t("empty.article.noArticle.label"),
      onClick: () => redirectToNewArticle(),
    };
  } else if (!isEmpty(search)) {
    return {
      title: t("empty.article.search.title", { search }),
      description: t("empty.article.search.description"),
      label: t("empty.article.search.label"),
      onClick: () => setFilters({ searchTerm: "" }),
    };
  } else if (!isEmpty(selectedCategories)) {
    return {
      title: t("empty.article.selectedCategories.title"),
      description: t("empty.article.selectedCategories.description"),
      label: t("empty.article.selectedCategories.label"),
      onClick: () => setFilters({ selectedCategories: [] }),
    };
  } else if (activeStatus !== DEFAULT_ACTIVE_STATUS) {
    return {
      title: t("empty.article.status.title"),
      description: t("empty.article.status.description"),
      label: t("empty.article.status.label"),
      onClick: () => setFilters({ activeStatus: DEFAULT_ACTIVE_STATUS }),
    };
  }

  return {
    title: t("empty.article.title"),
  };
};
