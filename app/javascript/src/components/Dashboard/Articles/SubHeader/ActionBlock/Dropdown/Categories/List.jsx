import React from "react";

import { Spinner, Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { isPresent } from "src/utils";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

const { Menu, MenuItem } = Dropdown;

const List = ({ searchTerm, handleUpdate }) => {
  const { t } = useTranslation();
  const { data, isFetching } = useFetchCategories({
    searchTerm,
  });

  if (isFetching) {
    <div className="flex justify-center p-4">
      <Spinner />
    </div>;
  }

  return (
    <>
      {isPresent(data.data?.categories) ? (
        <Menu className="flex flex-col gap-y-1">
          {data.data?.categories.map(({ title, id }) => (
            <MenuItem.Button key={id} onClick={() => handleUpdate(id)}>
              {title}
            </MenuItem.Button>
          ))}
        </Menu>
      ) : (
        <Typography className="mx-auto py-2" style="body3">
          {t("empty.category")}
        </Typography>
      )}
    </>
  );
};

export default List;
