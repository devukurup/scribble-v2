import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { PLURAL } from "constants";
import useDebounce from "hooks/useDebounce";
import { capitalize } from "neetocommons/pure";

import Categories from "./Categories";
import { ESCAPE_KEY } from "./constants";
import { statuses } from "./utils";

const MenuBar = ({
  activeStatus,
  setActiveStatus,
  isMenuBarOpen,
  setIsCreateModalOpen,
  selectedCategories,
  setSelectedCategories,
  articles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const { t } = useTranslation();

  const handleClose = () => {
    setSearchTerm("");
    setIsSearchCollapsed(true);
  };

  const handleKeyDown = event => {
    if (event.key === ESCAPE_KEY) {
      handleClose();
    }
  };

  return (
    <NeetoUIMenuBar
      showMenu={isMenuBarOpen}
      title={capitalize(t("common.article", PLURAL))}
    >
      {statuses(articles).map(({ label, count, value }) => (
        <NeetoUIMenuBar.Block
          active={activeStatus === value}
          count={count}
          key={value}
          label={label}
          onClick={() => setActiveStatus(value)}
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
            onClick: () => setIsCreateModalOpen(true),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          {t("common.category", PLURAL)}
        </Typography>
      </NeetoUIMenuBar.SubTitle>
      <NeetoUIMenuBar.Search
        autoFocus
        collapse={isSearchCollapsed}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        onCollapse={handleClose}
        onKeyDown={handleKeyDown}
      />
      <Categories
        debouncedSearchTerm={debouncedSearchTerm}
        isSearchCollapsed={isSearchCollapsed}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
