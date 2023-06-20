import React from "react";

import { Tag, Typography } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const Left = ({
  searchTerm,
  totalCount,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { t } = useTranslation();

  const handleClose = id =>
    setSelectedCategories(categories =>
      categories.filter(category => category.id !== id)
    );

  return (
    <div className="flex justify-center space-x-2">
      {isEmpty(searchTerm.trim()) ? (
        <Typography weight="semibold">
          {t("articles.subHeader.totalCount", { count: totalCount })}
        </Typography>
      ) : (
        <Typography weight="semibold">
          {t("articles.subHeader.searchCount", {
            count: totalCount,
            search: searchTerm,
          })}
        </Typography>
      )}
      {selectedCategories.map(({ title, id }) => (
        <Tag
          key={id}
          label={title}
          style="secondary"
          type="outline"
          onClose={() => handleClose(id)}
        />
      ))}
    </div>
  );
};

export default Left;
