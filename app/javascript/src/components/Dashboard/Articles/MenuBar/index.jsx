import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar as NeetoUIMenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import Categories from "./Categories";

import { STATUSES } from "../constants";

const MenuBar = ({
  activeStatus,
  setActiveStatus,
  isMenuBarOpen,
  setIsCreateModalOpen,
  isCategoriesLoading,
  categories,
  fetchCategories,
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const { t } = useTranslation();

  return (
    <NeetoUIMenuBar showMenu={isMenuBarOpen} title={t("common.articles")}>
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
          {t("common.categories")}
        </Typography>
      </NeetoUIMenuBar.SubTitle>
      <NeetoUIMenuBar.Search
        collapse={isSearchCollapsed}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      <Categories
        categories={categories}
        debouncedSearchTerm={debouncedSearchTerm}
        fetchCategories={fetchCategories}
        isLoading={isCategoriesLoading}
      />
    </NeetoUIMenuBar>
  );
};

export default MenuBar;
