import React from "react";

import { Spinner, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { removeById, existsById, isNotPresent } from "neetocommons/pure";

const Categories = ({
  selectedCategories,
  debouncedSearchTerm,
  setFilters,
  isSearchCollapsed,
}) => {
  const { t } = useTranslation();

  const { data: { categories } = {}, isFetching } = useFetchCategories({
    searchTerm: debouncedSearchTerm.trim(),
  });

  const handleCategoryClick = category => {
    if (existsById(category.id, selectedCategories)) {
      setFilters({
        selectedCategories: removeById(category.id, selectedCategories),
      });
    } else {
      setFilters({
        selectedCategories: [...selectedCategories, category],
      });
    }
  };

  if (isFetching) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (isNotPresent(categories) && !isSearchCollapsed) {
    return (
      <Typography className="flex justify-center" style="body2">
        {t("empty.category")}
      </Typography>
    );
  }

  return (
    <>
      {categories.map(category => (
        <MenuBar.Block
          active={existsById(category.id, selectedCategories)}
          count={category.articlesCount || 0}
          key={category.id}
          label={category.title}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </>
  );
};

export default Categories;
