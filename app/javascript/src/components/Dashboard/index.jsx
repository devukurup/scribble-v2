import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import routes from "src/routes";

import { DASHBOARD_ROUTES } from "./constants";

import Sidebar from "../commons/Sidebar";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route component={component} key={path} path={path} />
      ))}
      <Redirect from={routes.dashboard} to={routes.articles} />
    </Switch>
  </div>
);

export default Dashboard;
