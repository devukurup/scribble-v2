import { t } from "i18next";
import { Settings, Articles, ExternalLink, NeetoAnalytics } from "neetoicons";
import { PLURAL } from "src/constants";
import routes from "src/routes";

import { capitalize } from "neetocommons/pure";

export const RANDOM_PROFILE_IMAGE_URL = "https://i.pravatar.cc/300";

export const APP_NAME = "Scribble";

export const NAV_LINKS = [
  {
    label: capitalize(t("common.article", PLURAL)),
    description: t("tooltips.manageArticles"),
    to: routes.articles.index,
    icon: Articles,
  },
  {
    label: t("common.settings"),
    description: t("tooltips.configureSettings"),
    to: routes.settings.index,
    icon: Settings,
  },
  {
    label: t("common.analytics"),
    description: t("tooltips.analytics"),
    to: routes.analytics.index,
    icon: NeetoAnalytics,
  },
  {
    label: t("common.preview"),
    description: t("tooltips.launchPreview"),
    to: routes.public.articles.index,
    target: "_blank",
    icon: ExternalLink,
  },
];
