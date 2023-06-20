import React from "react";

import { SubHeader as NeetoUISubHeader } from "neetoui/layouts";

import Left from "./Block/Left";
import Right from "./Block/Right";

const SubHeader = ({
  searchTerm,
  totalCount,
  selectedCategories,
  setSelectedCategories,
}) => (
  <NeetoUISubHeader
    rightActionBlock={<Right />}
    leftActionBlock={
      <Left
        searchTerm={searchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        totalCount={totalCount}
      />
    }
  />
);

export default SubHeader;
