import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
}) => {
  if (condition) {
    return <Redirect to={redirectRoute} />;
  }

  return <Route component={Component} path={path} />;
};

export default PrivateRoute;
