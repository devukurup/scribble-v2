import React from "react";

import { Delete } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { useBulkUpdateArticles } from "hooks/reactQuery/useArticlesApi";
import { removeById, isPresent } from "neetocommons/pure";

import Categories from "./Dropdown/Categories";
import Statuses from "./Dropdown/Statuses";

const Left = ({
  filters,
  setFilters,
  totalCount,
  selectedArticleRowIds,
  setSelectedArticleRowIds,
  setIsDeleteAlertOpen,
  setIsBulkDelete,
}) => {
  const { t } = useTranslation();

  const { selectedCategories, searchTerm } = filters;

  const handleClose = id => {
    const newCategories = removeById(id, selectedCategories);

    setFilters({ selectedCategories: newCategories });
  };

  const { mutate: bulkUpdate } = useBulkUpdateArticles({
    onSuccess: () => setSelectedArticleRowIds([]),
  });

  const handleUpdateCategory = categoryId => {
    bulkUpdate({
      articleIds: selectedArticleRowIds,
      categoryId,
    });
  };

  const handleUpdateStatus = status => {
    bulkUpdate({
      articleIds: selectedArticleRowIds,
      status,
    });
  };

  const handleDelete = () => {
    setIsDeleteAlertOpen(true);
    setIsBulkDelete(true);
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {isPresent(selectedArticleRowIds) ? (
        <>
          <Typography weight="semibold">
            {t("dashboard.subHeader.selectedCount", {
              articleCount: t("common.articleCount", {
                count: selectedArticleRowIds.length,
              }),
              totalCount,
            })}
          </Typography>
          <Categories handleUpdate={handleUpdateCategory} />
          <Statuses handleUpdate={handleUpdateStatus} />
          <Button
            icon={Delete}
            iconPosition="right"
            label={t("common.delete")}
            style="danger"
            onClick={handleDelete}
          />
        </>
      ) : (
        <Typography weight="semibold">
          {isEmpty(searchTerm.trim())
            ? t("common.articleCount", { count: totalCount })
            : t("dashboard.subHeader.searchCount", {
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
