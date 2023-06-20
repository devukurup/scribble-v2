import React from "react";

import { ActionDropdown, Checkbox } from "neetoui";

const Right = ({ selectedColumns, setSelectedColumns }) => {
  const handleChange = key => {
    const updatedColumns = selectedColumns.map(column =>
      column.key === key ? { ...column, checked: !column.checked } : column
    );
    setSelectedColumns(updatedColumns);
  };

  return (
    <div>
      <ActionDropdown buttonStyle="secondary" label="Columns">
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
    </div>
  );
};

export default Right;
