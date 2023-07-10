import React from "react";
import NavBar from "./NavBar";
import { useShowSite } from "hooks/reactQuery/useSiteApi";
import { PageLoader } from "neetoui";
import { getFromSessionStorage } from "helpers/session";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Articles from "./Articles";
import PageNotFound from "src/PageNotFound";
import routes from "src/routes";

const Public = () => {
  const { data: { site } = {}, isLoading } = useShowSite();

  const authToken = getFromSessionStorage("authToken");
  const isLoggedIn = authToken ? true : false;

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar title={site?.title} />
      <div className="h-full overflow-auto">
        <Switch>
          <PrivateRoute
            component={Articles}
            condition={site?.isPasswordProtected && !isLoggedIn}
            path={[routes.public.articles.show, routes.public.articles.index]}
            redirectRoute={routes.login}
          />
          <Redirect
            exact
            from={routes.public.index}
            to={routes.public.articles.index}
          />
          <Route
            path="*"
            render={() => <PageNotFound route={routes.public.articles.index} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Public;
