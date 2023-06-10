import React, { useEffect, useState }  from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setIsLoading);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <div>Home</div>} />
        </Switch>
    </Router>
  )
}

export default App;