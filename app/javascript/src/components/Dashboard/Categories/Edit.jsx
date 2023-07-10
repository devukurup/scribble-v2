import React from "react";

import { Typography, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import { useUpdateCategory } from "hooks/reactQuery/useCategoriesApi";

import Form from "./Form";

const Edit = ({ isOpen, onClose, categoryToUpdate }) => {
  const { mutate: updateCategory, isLoading: isUpdating } = useUpdateCategory({
    onSuccess: onClose,
  });

  const { t } = useTranslation();

  const handleUpdate = values => {
    const { id } = categoryToUpdate;
    updateCategory({ id, payload: values });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">{t("category.edit")}</Typography>
      </Modal.Header>
      <Form
        isEdit
        handleSubmit={handleUpdate}
        initialValues={categoryToUpdate}
        isSubmitting={isUpdating}
        onClose={onClose}
      />
    </Modal>
  );
};

export default Edit;
