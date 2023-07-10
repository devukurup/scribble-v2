import React from "react";

import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useLocation, matchPath } from "react-router-dom";

import { ROUTES } from "./constants";

const MenuBar = ({ setActiveSettingsTab }) => {
  const { pathname, search } = useLocation();

  return (
    <NeetoUIMenuBar showMenu title="Settings">
      {ROUTES.map(route => (
        <NeetoUIMenuBar.Item
          active={matchPath(`${pathname}${search}`, route.path)}
          description={route.description}
          key={route.key}
          label={route.label}
          onClick={() => setActiveSettingsTab(route)}
        />
      ))}
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
