import React, { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import useDebounce from "hooks/useDebounce";
import { useFetchCategories } from "hooks/useFetchCategories";

import List from "./List";

const Categories = ({ handleUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories, isLoading, refetch } = useFetchCategories();
  const debouncedSearchTerm = useDebounce(searchTerm);

  const { t } = useTranslation();

  useEffect(() => {
    refetch(searchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Dropdown
      buttonStyle="secondary"
      closeOnSelect={false}
      label={t("common.changeCategory")}
    >
      <div className="flex flex-col gap-y-1 rounded-md p-2">
        <Input
          placeholder={t("common.searchCategory")}
          prefix={<Search />}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <List
          categories={categories}
          handleUpdate={handleUpdate}
          isLoading={isLoading}
        />
      </div>
    </Dropdown>
  );
};

export default Categories;
