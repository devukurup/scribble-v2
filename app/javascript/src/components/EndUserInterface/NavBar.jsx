import React from "react";

import { t } from "i18next";
import { Search } from "neetoicons";
import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const NavBar = ({ title, setIsSearchBarOpen }) => (
  <div className="flex h-12 items-center border-b-2">
    <Typography className="m-auto " style="h4" weight="semibold">
      {title}
    </Typography>
    <div
      className="mr-5 flex cursor-pointer items-center space-x-1 rounded border py-2 px-2"
      onClick={() => setIsSearchBarOpen(true)}
    >
      <Search size={18} />
      <Typography style="body3">
        <Trans
          defaults={t("public.placeholder")}
          components={{
            span: (
              <span className="neeto-ui-text-gray-600 neeto-ui-bg-gray-100 mx-1 rounded border p-1 " />
            ),
          }}
        />
      </Typography>
    </div>
  </div>
);

export default NavBar;
