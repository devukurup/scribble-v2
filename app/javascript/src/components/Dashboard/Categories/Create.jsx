import React from "react";

import { Typography, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";

import { INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Create = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const { isLoading, mutate: createCategory } = useCreateCategory({
    onSuccess: onClose,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">{t("category.add")}</Typography>
      </Modal.Header>
      <Form
        handleSubmit={({ title }) => createCategory({ title: title.trim() })}
        initialValues={INITIAL_VALUES}
        isSubmitting={isLoading}
        onClose={onClose}
      />
    </Modal>
  );
};

export default Create;
