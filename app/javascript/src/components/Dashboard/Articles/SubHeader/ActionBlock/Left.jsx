import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Delete } from "neetoicons";
import { Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { isPresent } from "src/utils";

import articlesApi from "apis/articles";

import Categories from "./Dropdown/Categories";
import Statuses from "./Dropdown/Statuses";

const Left = ({
  searchTerm,
  totalCount,
  selectedCategories,
  setSelectedCategories,
  selectedArticleRowIds,
  setSelectedArticleRowIds,
  setIsDeleteAlertOpen,
  setIsBulkDelete,
  refetchArticles,
}) => {
  const { t } = useTranslation();

  const handleClose = id =>
    setSelectedCategories(categories =>
      categories.filter(category => category.id !== id)
    );

  const bulkUpdateArticles = async param => {
    try {
      await articlesApi.bulkUpdateArticles({
        article_ids: selectedArticleRowIds,
        ...param,
      });
      setSelectedArticleRowIds([]);
      refetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleUpdateCategory = categoryId => {
    bulkUpdateArticles({ category_id: categoryId });
  };

  const handleUpdateStatus = status => {
    bulkUpdateArticles({ status });
  };

  const handleDelete = () => {
    setIsDeleteAlertOpen(true);
    setIsBulkDelete(true);
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {isPresent(selectedArticleRowIds) ? (
        <>
          <Typography>
            {t("articles.subHeader.selectedCount", {
              count: selectedArticleRowIds.length,
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
            ? t("articles.subHeader.totalCount", { count: totalCount })
            : t("articles.subHeader.searchCount", {
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
