import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import routes from "src/routes";

import { ROUTES } from "./constants";
import MenuBar from "./MenuBar";

const Settings = () => (
  <div className="flex h-screen w-full">
    <MenuBar />
    <Switch>
      {ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={routes.settings.index} to={routes.settings.general} />
    </Switch>
  </div>
);

export default Settings;
