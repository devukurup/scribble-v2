import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import Left from "./Block/Left";
import Right from "./Block/Right";

const SubHeader = ({
  searchTerm,
  totalCount,
  selectedCategories,
  setSelectedCategories,
  selectedColumns,
  setSelectedColumns,
}) => (
  <NeetoUISubHeader
    leftActionBlock={
      <Left
        searchTerm={searchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        totalCount={totalCount}
      />
    }
    rightActionBlock={
      <Right
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
    }
  />
);

export default SubHeader;
