import { t } from "i18next";

export const STATUSES = [
  {
    label: t("status.all"),
    active: true,
    count: 10,
  },
  {
    label: t("status.published"),
    active: false,
    count: 20,
  },
  {
    label: t("status.draft"),
    active: false,
    count: 30,
  },
];
