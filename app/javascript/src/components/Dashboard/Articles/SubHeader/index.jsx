import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import Left from "./ActionBlock/Left";
import Right from "./ActionBlock/Right";

const SubHeader = ({
  filters,
  setFilters,
  totalCount,
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
        filters={filters}
        selectedArticleRowIds={selectedArticleRowIds}
        setFilters={setFilters}
        setIsBulkDelete={setIsBulkDelete}
        setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        setSelectedArticleRowIds={setSelectedArticleRowIds}
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
