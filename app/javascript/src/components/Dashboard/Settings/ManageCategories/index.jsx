import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Create from "Dashboard/Categories/Create";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

import List from "./List";

const ManageCategories = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: { categories, categoriesCount } = {}, isLoading } =
    useFetchCategories({});

  const { t } = useTranslation();

  return (
    <div className="m-32 flex w-full flex-col p-5">
      <Typography
        className="neeto-ui-text-gray-700 px-8"
        lineHeight="loose"
        style="h2"
        weight="semibold"
      >
        {t("settings.manageCategories.title")}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-600 px-8"
        lineHeight="normal"
        style="body1"
        weight="normal"
      >
        {t("settings.manageCategories.description")}
      </Typography>
      <div className="my-4 flex items-center justify-between px-8">
        <Typography
          className="neeto-ui-text-gray-600"
          style="body2"
          weight="normal"
        >
          {t("settings.manageCategories.count", {
            count: categoriesCount,
          })}
        </Typography>
        <Button
          icon={Plus}
          iconPosition="left"
          label={t("category.add")}
          size="medium"
          style="link"
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      <List
        categories={categories}
        isLoading={isLoading}
        isSingleCategoryPresent={categoriesCount === 1}
      />
      <Create
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ManageCategories;
