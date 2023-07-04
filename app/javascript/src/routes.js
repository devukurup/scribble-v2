const routes = {
  dashboard: "/",
  login: "/login",
  articles: {
    index: "/articles",
    new: "/articles/new",
    edit: "/articles/:articleId/edit",
  },
  settings: {
    index: "/settings",
    general: "/settings/general",
    redirections: "/settings/redirections",
    security: "/settings/security",
    manageCategories: "/settings/manage-categories",
  },
  public: {
    index: "/public/",
    articles: {
      index: "/public/articles",
      show: "/public/articles/:slug",
    },
  },
};

export default routes;
