import React, { useState } from "react";

import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

const DeleteAlert = ({
  isOpen,
  setIsOpen,
  rowToBeDeleted,
  setRowToBeDeleted,
  refetch,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { title, id } = rowToBeDeleted;

  const { t } = useTranslation();

  const handleClose = () => {
    setIsOpen(false);
    setRowToBeDeleted({});
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await articlesApi.destroy(id);
      handleClose();
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
      onClose={handleClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
