import { t } from "i18next";

import { ARTICLE_STATUSES } from "Dashboard/Articles/constants";

export const statuses = articles => [
  {
    label: t("statuses.all"),
    count: articles.allArticlesCount || 0,
    value: ARTICLE_STATUSES.all,
  },
  {
    label: t("statuses.published"),
    count: articles.publishedArticlesCount || 0,
    value: ARTICLE_STATUSES.published,
  },
  {
    label: t("statuses.draft"),
    count: articles.draftArticlesCount || 0,
    value: ARTICLE_STATUSES.draft,
  },
];
