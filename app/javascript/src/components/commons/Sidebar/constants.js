import { Settings, Articles, ExternalLink } from "neetoicons";

const RANDOM_PROFILE_IMAGE_URL = "https://i.pravatar.cc/300";

export const APP_NAME = "Scribble";

export const SIDEBAR_NAV_LINKS = [
  {
    label: "Articles",
    to: "/articles",
    icon: Articles,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
  {
    label: "Preview",
    to: "/preview",
    icon: ExternalLink,
  },
];

export const SAMPLE_USER = {
  first_name: "Oliver",
  last_name: "Smith",
  email: "oliver@example.com",
  profile_image_url: RANDOM_PROFILE_IMAGE_URL,
};
