import React from "react";
import NavBar from "./NavBar";
import { useShowSite } from "hooks/useShowSite";
import { PageLoader } from "neetoui";
import { getFromSessionStorage } from "helpers/session";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Articles from "./Articles";

const Public = () => {
  const {
    data: { site },
    isLoading,
  } = useShowSite();

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
            condition={site?.is_password_protected && !isLoggedIn}
            path="/public/articles/:slug"
            redirectRoute="/login"
          />
          <PrivateRoute
            component={Articles}
            condition={site?.is_password_protected && !isLoggedIn}
            path="/public/articles/"
            redirectRoute="/login"
          />
        </Switch>
      </div>
    </div>
  );
};

export default Public;
