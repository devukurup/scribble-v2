import React from "react";
import { Typography } from "neetoui";
import { Search } from "neetoicons";

const NavBar = ({ title, setIsSearchBarOpen }) => (
  <div className="flex h-12 items-center border-b-2">
    <Typography style="h4" weight="semibold" className="m-auto ">
      {title}
    </Typography>
    <div
      onClick={() => setIsSearchBarOpen(true)}
      className="mr-5 flex cursor-pointer items-center space-x-1 rounded border py-2 px-2"
    >
      <Search size={18} />
      <Typography style="body3">
        Type
        <span className="neeto-ui-text-gray-600 neeto-ui-bg-gray-100 mx-1 rounded border p-1 ">
          /
        </span>
        to search
      </Typography>
    </div>
  </div>
);

export default NavBar;
