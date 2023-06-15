import React, { useState } from "react";

import Create from "Dashboard/Categories/Create";
import { Plus } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const ManageCategories = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="m-32 flex w-full flex-col border-2 p-5">
      <Typography
        className="neeto-ui-text-gray-700"
        lineHeight="loose"
        style="h2"
        weight="semibold"
      >
        {t("settings.manageCategories.title")}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-600"
        lineHeight="normal"
        style="body1"
        weight="normal"
      >
        {t("settings.manageCategories.description")}
      </Typography>
      <div className="my-4 flex items-center justify-between">
        <Typography
          className="neeto-ui-text-gray-600"
          style="body2"
          weight="normal"
        >
          {t("settings.manageCategories.count", { count: 7 })}
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
      <Create
        isOpen={isCreateModalOpen}
        refetch={() => {}}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ManageCategories;
