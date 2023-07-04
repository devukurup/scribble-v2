import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import Left from "./ActionBlock/Left";
import Right from "./ActionBlock/Right";

const SubHeader = ({
  searchTerm,
  totalCount,
  selectedCategories,
  setSelectedCategories,
  selectedColumns,
  setSelectedColumns,
  selectedArticleRowIds,
  setSelectedArticleRowIds,
  setIsDeleteAlertOpen,
  setIsBulkDelete,
}) => (
  <NeetoUISubHeader
    leftActionBlock={
      <Left
        searchTerm={searchTerm}
        selectedArticleRowIds={selectedArticleRowIds}
        selectedCategories={selectedCategories}
        setIsBulkDelete={setIsBulkDelete}
        setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        setSelectedArticleRowIds={setSelectedArticleRowIds}
        setSelectedCategories={setSelectedCategories}
        totalCount={totalCount}
      />
    }
    rightActionBlock={
      <Right
        selectedArticleRowIds={selectedArticleRowIds}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
    }
  />
);

export default SubHeader;
