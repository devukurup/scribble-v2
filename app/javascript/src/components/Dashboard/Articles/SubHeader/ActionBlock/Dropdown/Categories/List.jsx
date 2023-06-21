import React from "react";

import { Spinner, Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { isPresent } from "src/utils";

const { Menu, MenuItem } = Dropdown;

const List = ({ isLoading, categories, handleUpdate }) => {
  const { t } = useTranslation();
  if (isLoading) {
    <div className="flex justify-center p-4">
      <Spinner />
    </div>;
  }

  return (
    <>
      {isPresent(categories) ? (
        <Menu className="flex flex-col gap-y-1">
          {categories.map(({ title, id }) => (
            <MenuItem.Button key={id} onClick={() => handleUpdate(id)}>
              {title}
            </MenuItem.Button>
          ))}
        </Menu>
      ) : (
        <Typography className="mx-auto py-2" style="body3">
          {t("category.empty")}
        </Typography>
      )}
    </>
  );
};

export default List;
