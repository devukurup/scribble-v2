import Articles from "components/Dashboard/Articles";
import Preview from "components/Dashboard/Preview";
import Settings from "components/Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const ARTICLES_PATH = "/articles";
export const SETTINGS_PATH = "/settings";
export const PREVIEW_PATH = "/eui";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: PREVIEW_PATH,
    component: Preview,
  },
];
