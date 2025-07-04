import React from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import {
  useDeleteCategory,
  useFetchCategories,
} from "hooks/reactQuery/useCategoriesApi";

import Form from "./Form";

const Delete = ({
  isOpen,
  onClose,
  categoryToBeDeleted,
  isSingleCategoryPresent,
}) => {
  const { data, isLoading: isLoadingCategories } = useFetchCategories({
    enabled: false,
  });

  const { mutate, isLoading: isDeleting } = useDeleteCategory({
    onSuccess: onClose,
  });

  const { t } = useTranslation();

  const { title, articlesCount, id } = categoryToBeDeleted;

  const handleDelete = (values = {}) => {
    const payload =
      articlesCount > 0 && !isSingleCategoryPresent
        ? { id, targetCategoryId: values.category.value }
        : { id };
    mutate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h3">{t("delete.category.title")}</Typography>
      </Modal.Header>
      {articlesCount > 0 && !isSingleCategoryPresent ? (
        <Form
          categories={data?.categories}
          category={categoryToBeDeleted}
          isLoading={isLoadingCategories}
          onClose={onClose}
          onSubmit={handleDelete}
        />
      ) : (
        <>
          <Modal.Body>
            <Typography style="body1">
              <Trans
                components={{ bold: <strong /> }}
                defaults={t("delete.messageWithTitle", { title })}
              />
            </Typography>
            {articlesCount > 0 && (
              <Callout icon={Warning} style="danger">
                <Typography style="body1" weight="semibold">
                  <Trans
                    components={{ bold: <strong /> }}
                    defaults={t("delete.category.newCategoryAlert", {
                      title,
                      articlesCount: t("common.articleCount", {
                        count: articlesCount || 0,
                      }),
                    })}
                  />
                </Typography>
              </Callout>
            )}
          </Modal.Body>
          <Modal.Footer className="flex space-x-2">
            <Button
              disabled={isDeleting}
              label={t("common.continue")}
              loading={isDeleting}
              style="danger"
              type="submit"
              onClick={handleDelete}
            />
            <Button
              label={t("common.cancel")}
              style="text"
              type="reset"
              onClick={onClose}
            />
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default Delete;
