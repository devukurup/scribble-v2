import React from "react";
import { Typography } from "neetoui";

const NavBar = ({ title }) => {
  return (
    <div className="flex h-12 flex-col border-b-2">
      <Typography style="h4" weight="semibold" className="m-auto ">
        {title}
      </Typography>
    </div>
  );
};

export default NavBar;
