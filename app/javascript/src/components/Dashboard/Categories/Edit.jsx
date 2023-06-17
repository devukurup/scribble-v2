import React from "react";

import { Typography, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import { useUpdateCategories } from "hooks/useUpdateCategories";

import Form from "./Form";

const Edit = ({ isOpen, refetch, onClose, categoryToUpdate }) => {
  const { update } = useUpdateCategories();

  const { t } = useTranslation();

  const handleUpdate = values => {
    const { id } = categoryToUpdate;
    update({ id, payload: values, onSuccess: refetch });
    onClose();
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
        onClose={onClose}
      />
    </Modal>
  );
};

export default Edit;
