import { t } from "i18next";

import { ARTICLE_STATUSES } from "../constants";

export const isCategoryPresent = ({ categoryId, categories }) =>
  categories.some(({ id }) => categoryId === id);

export const removeCategory = ({ categoryId, categories }) =>
  categories.filter(({ id }) => categoryId !== id);

export const statuses = articles => [
  {
    label: t("statuses.all"),
    count: articles.all_articles_count || 0,
    value: ARTICLE_STATUSES.all,
  },
  {
    label: t("statuses.published"),
    count: articles.published_articles_count || 0,
    value: ARTICLE_STATUSES.published,
  },
  {
    label: t("statuses.draft"),
    count: articles.draft_articles_count || 0,
    value: ARTICLE_STATUSES.draft,
  },
];
