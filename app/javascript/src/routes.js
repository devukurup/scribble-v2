const routes = {
  dashboard: "/",
  preview: "/eui",
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
};

export default routes;
