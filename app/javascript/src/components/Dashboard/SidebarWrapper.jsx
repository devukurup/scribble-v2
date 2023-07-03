import React from "react";

import Sidebar from "components/commons/Sidebar";

const SidebarWrapper = ({ children }) => (
  <div className="flex h-screen w-screen">
    <Sidebar />
    {children}
  </div>
);

export default SidebarWrapper;
