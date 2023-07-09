import { t } from "i18next";
import routes from "src/routes";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";
import Security from "./Security";

export const ROUTES = [
  {
    key: "general",
    path: routes.settings.general,
    label: t("common.general"),
    description: t("settingsDescription.general"),
    component: General,
  },
  {
    key: "redirections",
    path: routes.settings.redirections,
    label: t("common.redirections"),
    description: t("settingsDescription.redirections"),
    component: Redirections,
  },
  {
    key: "security",
    path: routes.settings.security,
    label: t("common.security"),
    description: t("settingsDescription.security"),
    component: Security,
  },
  {
    key: "manage-categories",
    path: routes.settings.manageCategories,
    label: t("common.manageCategories"),
    description: t("settingsDescription.manageCategories"),
    component: ManageCategories,
  },
];
