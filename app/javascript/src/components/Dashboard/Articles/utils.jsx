import React from "react";

import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Button, Typography, Dropdown } from "neetoui";
import { TITLE_TRUNCATE_LENGTH } from "src/constants";
import { formattedDate, truncate } from "src/utils";

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
