import React from "react";

import { Typography, Button } from "neetoui";
import { DEFAULT_PAGE_NUMBER, TITLE_TRUNCATE_LENGTH } from "src/constants";
import routes from "src/routes";
import { formattedDate, truncate } from "src/utils";

import { buildUrl } from "neetocommons/utils";

export const initializePageNumber = () => {
  const page = new URLSearchParams(window.location.search).get("page");

  return parseInt(page) || DEFAULT_PAGE_NUMBER;
};

export const buildPageSearchParam = page => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set("page", page);

  return currentUrlParams;
};

export const renderFormattedDate = createdAt => (
  <Typography style="body2">{formattedDate(createdAt)}</Typography>
);

export const renderTitleLink = ({ title, slug }) => (
  <Button
    label={truncate(title)}
    style="link"
    target="_blank"
    to={buildUrl(routes.public.articles.show, { slug })}
    tooltipProps={title.length > TITLE_TRUNCATE_LENGTH && { content: title }}
  />
);
