import { t } from "i18next";

export const isCategoryPresent = ({ categoryId, categories }) =>
  categories.some(({ id }) => categoryId === id);

export const removeCategory = ({ categoryId, categories }) =>
  categories.filter(({ id }) => categoryId !== id);

export const statuses = articles => [
  {
    label: t("statuses.all"),
    count: articles.all_articles_count,
  },
  {
    label: t("statuses.published"),
    count: articles.published_articles_count,
  },
  {
    label: t("statuses.draft"),
    count: articles.draft_articles_count,
  },
];
