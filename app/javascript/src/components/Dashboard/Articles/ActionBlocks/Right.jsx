import React from "react";

import { ActionDropdown, Checkbox } from "neetoui";

import { isNotPresent } from "neetocommons/pure";
import useArticlesStore from "stores/useArticlesStore";

const Right = () => {
  const { selectedArticleRowIds, selectedColumns, setSelectedColumns } =
    useArticlesStore.pick();

  const handleChange = key => {
    const updatedColumns = selectedColumns.map(column =>
      column.key === key ? { ...column, checked: !column.checked } : column
    );
    setSelectedColumns(updatedColumns);
  };

  return (
    <>
      {isNotPresent(selectedArticleRowIds) && (
        <ActionDropdown
          buttonStyle="secondary"
          dropdownProps={{ closeOnSelect: false }}
          label="Columns"
        >
          <div className="m-1 flex flex-col space-y-3 p-2">
            {selectedColumns.map(({ label, checked, key, disabled }) => (
              <Checkbox
                checked={checked}
                disabled={disabled}
                id={key}
                key={key}
                label={label}
                onChange={() => handleChange(key)}
              />
            ))}
          </div>
        </ActionDropdown>
      )}
    </>
  );
};

export default Right;
