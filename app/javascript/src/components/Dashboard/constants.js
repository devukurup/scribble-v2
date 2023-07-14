import routes from "src/routes";

import Analytics from "Dashboard/Analytics";
import Articles from "Dashboard/Articles";
import CreateArticle from "Dashboard/Articles/Create";
import EditArticle from "Dashboard/Articles/Edit";
import Settings from "Dashboard/Settings";

export const DASHBOARD_ROUTES = [
  {
    path: routes.articles.edit,
    component: EditArticle,
    isExact: true,
  },
  {
    path: routes.articles.new,
    component: CreateArticle,
    isExact: true,
  },
  {
    path: routes.articles.index,
    component: Articles,
    isExact: true,
  },
  {
    path: routes.settings.index,
    component: Settings,
    isExact: false,
  },
  {
    path: routes.analytics.index,
    component: Analytics,
    isExact: false,
  },
];
