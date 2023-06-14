import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setIsLoading);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
