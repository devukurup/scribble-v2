import React, { useState } from "react";

import { noop } from "@bigbinary/neeto-commons-frontend/pure";
import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

const DeleteAlert = ({
  isOpen,
  rowToBeDeleted,
  refetch = noop,
  isBulkDelete = false,
  selectedArticleRowIds = [],
  onClose,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { title, id } = rowToBeDeleted;

  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      isBulkDelete
        ? await articlesApi.bulkDeleteArticles({
            article_ids: selectedArticleRowIds,
          })
        : await articlesApi.destroy(id);
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Alert
      isOpen={isOpen}
      isSubmitting={isDeleting}
      message={t("articles.delete.message", { title })}
      title={t("articles.delete.title")}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
