import routes from "src/routes";

import Articles from "Dashboard/Articles";
import CreateArticle from "Dashboard/Articles/Create";
import EditArticle from "Dashboard/Articles/Edit";
import Preview from "Dashboard/Preview";
import Settings from "Dashboard/Settings";

export const DASHBOARD_ROUTES = [
  {
    path: routes.articles.edit,
    component: EditArticle,
  },
  {
    path: routes.articles.new,
    component: CreateArticle,
  },
  {
    path: routes.articles.index,
    component: Articles,
  },
  {
    path: routes.settings.index,
    component: Settings,
  },
  {
    path: routes.preview,
    component: Preview,
  },
];
