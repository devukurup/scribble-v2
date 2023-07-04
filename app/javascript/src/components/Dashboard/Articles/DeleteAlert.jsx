import React, { useState } from "react";

import { Alert } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import { noop } from "neetocommons/pure";

import { SINGLE_ARTICLE_COUNT } from "./constants";

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
      message={
        isBulkDelete ? (
          t("delete.messageWithoutTitle", {
            entity: t("common.article", {
              count: selectedArticleRowIds.length,
            }),
          })
        ) : (
          <Trans
            components={{ bold: <strong /> }}
            defaults={t("delete.messageWithTitle", { title })}
          />
        )
      }
      title={t("delete.title", {
        entity: t("common.article", {
          count: isBulkDelete
            ? selectedArticleRowIds.length
            : SINGLE_ARTICLE_COUNT,
        }),
      })}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
