import React from "react";

import { Alert } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import {
  useBulkDeleteArticles,
  useDeleteArticle,
} from "hooks/reactQuery/useArticlesApi";
import useArticlesStore from "stores/useArticlesStore";

import { SINGLE_ARTICLE_COUNT } from "./constants";

const DeleteAlert = ({ rowToBeDeleted, isBulkDelete = false, onClose }) => {
  const { title, id } = rowToBeDeleted;

  const { t } = useTranslation();

  const {
    isDeleteAlertOpen: isOpen,
    selectedArticleRowIds,
    setIsDeleteAlertOpen,
  } = useArticlesStore.pick();

  const { mutate: bulkDelete, isLoading: isBulkDeleting } =
    useBulkDeleteArticles({ onSuccess: onClose });

  const { mutate: destroy, isLoading: isDeleting } = useDeleteArticle({
    onSuccess: onClose,
  });

  const handleDelete = async () => {
    isBulkDelete ? bulkDelete(selectedArticleRowIds) : destroy(id);
  };

  return (
    <Alert
      isOpen={isOpen}
      isSubmitting={isBulkDeleting || isDeleting}
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
      onClose={() => setIsDeleteAlertOpen(false)}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
