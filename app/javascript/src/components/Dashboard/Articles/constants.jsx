import React from "react";

import { isEditorEmpty } from "@bigbinary/neeto-editor";
import { t } from "i18next";
import { Button, Typography } from "neetoui";
import { TITLE_TRUNCATE_LENGTH } from "src/constants";
import { formattedDate, truncate } from "src/utils";
import * as yup from "yup";

export const STATUSES = [
  {
    label: t("statuses.all"),
    count: 10,
  },
  {
    label: t("statuses.published"),
    count: 20,
  },
  {
    label: t("statuses.draft"),
    count: 30,
  },
];

export const EDITOR_ADDONS = [
  "highlight",
  "code-block",
  "block-quote",
  "divider",
  "paste-unformatted",
  "undo",
  "redo",
];

export const VALID_TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9& -]*$/;

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required(t("validations.required", { field: t("common.title") }))
    .max(255, t("validations.maximumLength", { field: t("common.title") }))
    .matches(
      VALID_TITLE_REGEX,
      t("validations.invalidPattern", { field: t("common.title") })
    ),
  body: yup
    .string()
    .test(
      "body",
      t("validations.required", { field: t("common.description") }),
      value => !isEditorEmpty(value)
    ),
  category: yup
    .object()
    .required(t("validations.required", { field: t("common.category") })),
});

export const INITIAL_VALUES = {
  body: "<p></p>",
  title: "",
  category: "",
};

export const STATUS = {
  Publish: "published",
  "Save as draft": "draft",
};

export const COLUMN_DATA = [
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
];
