import React from "react";

import { Form as FormikForm, Formik } from "formik";
import { Warning } from "neetoicons";
import { Button, Callout, Spinner, Modal, Typography } from "neetoui";
import { Select } from "neetoui/formik";
import { Trans, useTranslation } from "react-i18next";
import { deleteObjectById } from "src/utils";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

import { formatCategories } from "../../Articles/utils";

const Form = ({ onSubmit, category, onClose, categories = [], isLoading }) => {
  const { title, articlesCount, id } = category;

  const { t } = useTranslation();

  return (
    <Formik
      enableReinitialize
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, isSubmitting }) =>
        isLoading ? (
          <Spinner />
        ) : (
          <FormikForm>
            <Modal.Body className="flex flex-col space-y-4">
              <Typography style="body1">
                <Trans
                  components={{ bold: <strong /> }}
                  defaults={t("delete.messageWithTitle", { title })}
                />
              </Typography>
              <Callout icon={Warning} style="danger">
                <Typography style="body1" weight="semibold">
                  <Trans
                    components={{ bold: <strong /> }}
                    defaults={t("delete.category.alert", {
                      title,
                      articlesCount: t("common.articleCount", {
                        count: articlesCount || 0,
                      }),
                    })}
                  />
                </Typography>
              </Callout>
              <Select
                isSearchable
                required
                label={t("delete.category.selectLabel")}
                name="category"
                placeholder={t("articles.selectCategory")}
                options={formatCategories(
                  deleteObjectById({ arr: categories ?? [], id })
                )}
              />
            </Modal.Body>
            <Modal.Footer className="flex space-x-2">
              <Button
                disabled={isSubmitting || !isValid || !dirty}
                label={t("common.continue")}
                style="danger"
                type="submit"
              />
              <Button
                label={t("common.cancel")}
                style="text"
                type="reset"
                onClick={onClose}
              />
            </Modal.Footer>
          </FormikForm>
        )
      }
    </Formik>
  );
};

export default Form;
