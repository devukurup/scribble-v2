import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageNotFound from "src/PageNotFound";
import routes from "src/routes";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import ErrorBoundary from "components/commons/ErrorBoundary";
import { DASHBOARD_ROUTES } from "components/Dashboard/constants";
import Public from "components/Public";
import Login from "components/Public/Login";
import { useDisplayErrorPage } from "neetocommons/react-utils";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setIsLoading);
  }, []);

  const queryClient = new QueryClient();

  const displayErrorPage = useDisplayErrorPage();
  if (displayErrorPage) {
    return <PageNotFound route={routes.dashboard} />;
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <ErrorBoundary>
          <Switch>
            <Route exact component={Login} path={routes.login} />
            <Route component={Public} path={routes.public.index} />
            {DASHBOARD_ROUTES.map(({ path, component, isExact }) => (
              <Route
                component={component}
                exact={isExact}
                key={path}
                path={path}
              />
            ))}
            <Redirect
              exact
              from={routes.dashboard}
              to={routes.articles.index}
            />
            <Route
              path="*"
              render={() => <PageNotFound route={routes.dashboard} />}
            />
          </Switch>
        </ErrorBoundary>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
