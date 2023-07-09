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
    general: "/settings?tab=general",
    redirections: "/settings?tab=redirections",
    security: "/settings?tab=security",
    manageCategories: "/settings?tab=manage-categories",
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
