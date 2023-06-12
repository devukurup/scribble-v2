import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import {
  DASHBOARD_ROUTES,
  DASHBOARD_PATH,
  ARTICLES_PATH,
} from "./routeConstants";

import Sidebar from "../commons/Sidebar";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={ARTICLES_PATH} />
    </Switch>
  </div>
);

export default Dashboard;
