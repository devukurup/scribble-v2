import { t } from "i18next";

export const STATUSES = [
  {
    label: t("statuses.all"),
    active: true,
    count: 10,
  },
  {
    label: t("statuses.published"),
    active: false,
    count: 20,
  },
  {
    label: t("statuses.draft"),
    active: false,
    count: 30,
  },
];
