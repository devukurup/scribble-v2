import React from "react";

import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useHistory, useLocation, matchPath } from "react-router-dom";

import { ROUTES } from "./constants";

const MenuBar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <NeetoUIMenuBar showMenu title="Settings">
      {ROUTES.map(({ path, label, description }) => (
        <NeetoUIMenuBar.Item
          active={matchPath(location.pathname, path)}
          description={description}
          key={path}
          label={label}
          onClick={() => history.push(path)}
        />
      ))}
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
