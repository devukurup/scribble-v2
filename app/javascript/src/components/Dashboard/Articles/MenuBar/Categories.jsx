import React, { useEffect, useState } from "react";

import { Spinner } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { isCategoryPresent, removeCategory } from "./utils";

const Categories = ({
  isLoading,
  categories,
  fetchCategories,
  debouncedSearchTerm,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    return <Spinner />;
  }

  return (
    <>
      {categories.map(category => (
        <MenuBar.Block
          count={10}
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
