import Articles from "components/Dashboard/Articles";
import Preview from "components/Dashboard/Preview";
import Settings from "components/Dashboard/Settings";
import routes from "src/routes";

export const DASHBOARD_ROUTES = [
  {
    path: routes.articles,
    component: Articles,
  },
  {
    path: routes.settings,
    component: Settings,
  },
  {
    path: routes.preview,
    component: Preview,
  },
];
