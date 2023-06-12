import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
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
      <Switch>
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
