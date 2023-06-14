import React from "react";

import categoriesApi from "apis/categories";
import { Typography, Modal } from "neetoui";
import { useTranslation } from "react-i18next";

import { INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Create = ({ isOpen, refetch, onClose }) => {
  const { t } = useTranslation();

  const handleSubmit = async ({ title }) => {
    try {
      await categoriesApi.create({ title: title.trim() });
      refetch();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">{t("category.add")}</Typography>
      </Modal.Header>
      <Form
        handleSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        onClose={onClose}
      />
    </Modal>
  );
};

export default Create;
