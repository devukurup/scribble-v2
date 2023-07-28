import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "src/PageNotFound";
import routes from "src/routes";

import { useShowSite } from "hooks/reactQuery/useSiteApi";
import { useHotKeys } from "neetocommons/react-utils";
import { getFromSessionStorage } from "utils/storage";

import Articles from "./Articles";
import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";
import Search from "./Search";

const EndUserInterface = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const { data: { site } = {}, isLoading } = useShowSite();

  const authToken = getFromSessionStorage("authToken");
  const isLoggedIn = !!authToken;

  const handleHotKey = () => setTimeout(() => setIsSearchBarOpen(true), 100);

  useHotKeys("/", handleHotKey);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar setIsSearchBarOpen={setIsSearchBarOpen} title={site?.title} />
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
      {isSearchBarOpen && (
        <Search
          isSearchBarOpen={isSearchBarOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
        />
      )}
    </div>
  );
};

export default EndUserInterface;
