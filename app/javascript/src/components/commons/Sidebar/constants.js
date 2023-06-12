import { t } from "i18next";
import { Settings, Articles, ExternalLink } from "neetoicons";

const RANDOM_PROFILE_IMAGE_URL = "https://i.pravatar.cc/300";

export const APP_NAME = "Scribble";

export const SIDEBAR_NAV_LINKS = [
  {
    label: t("common.articles"),
    to: "/articles",
    icon: Articles,
  },
  {
    label: t("common.settings"),
    to: "/settings",
    icon: Settings,
  },
  {
    label: t("common.preview"),
    to: "/eui",
    icon: ExternalLink,
  },
];

export const SAMPLE_USER = {
  first_name: "Oliver",
  last_name: "Smith",
  email: "oliver@example.com",
  profile_image_url: RANDOM_PROFILE_IMAGE_URL,
};
