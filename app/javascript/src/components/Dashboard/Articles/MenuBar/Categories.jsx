import React, { useEffect } from "react";

import { Spinner, Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { isPresent } from "utils";

import { isCategoryPresent, removeCategory } from "./utils";

const Categories = ({
  isLoading,
  categories,
  fetchCategories,
  debouncedSearchTerm,
  selectedCategories,
  setSelectedCategories,
  isSearchCollapsed,
}) => {
  const { t } = useTranslation();

  const handleCategoryClick = category => {
    if (
      isCategoryPresent({
        categoryId: category.id,
        categories: selectedCategories,
      })
    ) {
      setSelectedCategories(
        removeCategory({
          categoryId: category.id,
          categories: selectedCategories,
        })
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [debouncedSearchTerm]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isPresent(categories) && !isSearchCollapsed) {
    return (
      <Typography className="flex justify-center" style="body2">
        {t("category.empty")}
      </Typography>
    );
  }

  return (
    <>
      {categories.map(category => (
        <MenuBar.Block
          count={category.articles_count || 0}
          key={category.id}
          label={category.title}
          active={isCategoryPresent({
            categoryId: category.id,
            categories: selectedCategories,
          })}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </>
  );
};

export default Categories;
