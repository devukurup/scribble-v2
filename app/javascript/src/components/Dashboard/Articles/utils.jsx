import React from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Button, Typography, Dropdown } from "neetoui";
import { isEmpty } from "ramda";
import { TITLE_TRUNCATE_LENGTH } from "src/constants";
import { formattedDate, truncate } from "src/utils";

import { DEFAULT_ACTIVE_STATUS } from "./constants";

const { Menu, MenuItem } = Dropdown;

export const formatCategories = categories =>
  categories?.map(({ title, id }) => ({ label: title, value: id }));

export const columnData = ({ handleDelete, handleUpdate }) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 350,
    render: (title, { id }) => (
      <Button
        label={truncate(title)}
        style="link"
        to={`/articles/${id}/edit`}
        tooltipProps={
          title.length > TITLE_TRUNCATE_LENGTH && { content: title }
        }
      />
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 200,
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    width: 125,
  },
  {
    title: "Last published at",
    dataIndex: "last_published_at",
    key: "last_published_at",
    width: 150,
    render: last_published_at => (
      <Typography style="body2">
        {last_published_at ? formattedDate(last_published_at) : "-"}
      </Typography>
    ),
  },
  {
    title: "Status",
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
    render: (_, row) => {
      const { status, id } = row;
      const publishStatus = status === "draft" ? "Publish" : "Unpublish";

      return (
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button
              onClick={() => handleUpdate({ id, publishStatus })}
            >
              {publishStatus}
            </MenuItem.Button>
            <MenuItem.Button style="danger" onClick={() => handleDelete(row)}>
              {t("common.delete")}
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      );
    },
  },
];

export const setUrlParams = ({ page, limit, search, status }) => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set("page", page);
  currentUrlParams.set("limit", limit);
  !isEmpty(search.trim())
    ? currentUrlParams.set("search", search)
    : currentUrlParams.delete("search");

  status !== "All"
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
  setActiveStatus,
  setSearch,
  setSelectedCategories,
  totalCount,
  redirectToNewArticle,
}) => {
  if (totalCount === 0) {
    return {
      title: t("articles.empty.noArticle.title"),
      description: t("articles.empty.noArticle.description"),
      label: t("articles.empty.noArticle.label"),
      onClick: () => redirectToNewArticle(),
    };
  } else if (!isEmpty(search)) {
    return {
      title: t("articles.empty.search.title", { search }),
      description: t("articles.empty.search.description"),
      label: t("articles.empty.search.label"),
      onClick: () => setSearch(""),
    };
  } else if (!isEmpty(selectedCategories)) {
    return {
      title: t("articles.empty.selectedCategories.title"),
      description: t("articles.empty.selectedCategories.description"),
      label: t("articles.empty.selectedCategories.label"),
      onClick: () => setSelectedCategories([]),
    };
  } else if (activeStatus !== DEFAULT_ACTIVE_STATUS) {
    return {
      title: t("articles.empty.status.title"),
      description: t("articles.empty.status.description"),
      label: t("articles.empty.status.label"),
      onClick: () => setActiveStatus(DEFAULT_ACTIVE_STATUS),
    };
  }

  return {
    title: t("articles.empty.title"),
  };
};
