import React, { useEffect, useState } from "react";

import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import { ROUTES } from "./constants";
import MenuBar from "./MenuBar";
import { getActiveSettingsTab } from "./utils";

import SidebarWrapper from "../SidebarWrapper";

const Settings = () => {
  const location = useLocation();
  const { tab } = queryString.parse(location.search);
  const [activeSettingsTab, setActiveSettingsTab] = useState(
    () => getActiveSettingsTab(tab) || ROUTES[0]
  );

  const history = useHistory();

  useEffect(() => {
    history.push(activeSettingsTab?.path);
  }, [activeSettingsTab]);

  return (
    <SidebarWrapper>
      <div className="flex h-screen w-full">
        <MenuBar setActiveSettingsTab={setActiveSettingsTab} />
        <activeSettingsTab.component />
      </div>
    </SidebarWrapper>
  );
};

export default Settings;
