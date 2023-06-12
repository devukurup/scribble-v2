import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { STATUSES } from "./constants";

const MenuBar = () => {
  const [activeStatus, setActiveStatus] = useState(STATUSES[0].label);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);

  const { t } = useTranslation();

  return (
    <NeetoUIMenuBar showMenu title={t("common.articles")}>
      {STATUSES.map(({ label, count }) => (
        <NeetoUIMenuBar.Block
          active={activeStatus === label}
          count={count}
          key={label}
          label={label}
          onClick={() => setActiveStatus(label)}
        />
      ))}
      <NeetoUIMenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
          {
            icon: Plus,
            onClick: () => {},
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          {t("common.categories")}
        </Typography>
      </NeetoUIMenuBar.SubTitle>
      <NeetoUIMenuBar.Search
        collapse={isSearchCollapsed}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
