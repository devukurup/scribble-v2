import React, { useState } from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { Formik, Form as FormikForm } from "formik";
import { MenuHorizontal } from "neetoicons";
import { ActionDropdown, Dropdown, Typography, Button } from "neetoui";
import { Textarea, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";
import { useFetchCategories } from "hooks/useFetchCategories";

import {
  VALIDATION_SCHEMA,
  EDITOR_ADDONS,
  KEYBOARD_ENTER_KEY,
  DEFAULT_ROW_COUNT,
} from "./constants";
import { formatCategories } from "./utils";

import { CATEGORY_VALIDATION_SCHEMA } from "../Categories/constants";

const { Menu, MenuItem } = ActionDropdown;

const Form = ({
  handleSubmit,
  initialValues,
  onClose,
  initialStatus,
  isEdit = false,
  handleDelete = () => {},
  dateString = "",
}) => {
  const [status, setStatus] = useState(initialStatus);

  const { data, isLoading, refetch } = useFetchCategories();

  const { t } = useTranslation();

  const validateCategoryTitle = async title => {
    try {
      await CATEGORY_VALIDATION_SCHEMA.validate(title);

      return undefined;
    } catch (error) {
      return error.message;
    }
  };

  const handleCreate = async ({ title, setFieldValue, setErrors, errors }) => {
    try {
      const validationError = await validateCategoryTitle(title);
      if (!validationError) {
        const {
          data: { category },
        } = await categoriesApi.create({ title: title.trim() });
        refetch();

        setFieldValue("category", {
          label: category?.title,
          value: category?.id,
        });
      } else {
        setErrors({ ...errors, category: validationError });
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="my-4 w-full">
      <Formik
        enableReinitialize
        validateOnBlur
        validateOnChange
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={values => handleSubmit({ ...values, status })}
      >
        {({
          errors,
          setFieldValue,
          isValid,
          dirty,
          isSubmitting,
          setErrors,
        }) => (
          <FormikForm>
            <div className="mx-4 flex items-center justify-between">
              <div className="w-96">
                <Select
                  isCreateable
                  isSearchable
                  isLoading={isLoading}
                  name="category"
                  options={formatCategories(data?.categories)}
                  placeholder={t("articles.selectCategory")}
                  onCreateOption={title =>
                    handleCreate({
                      title,
                      setErrors,
                      errors,
                      setFieldValue,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-3">
                {isEdit && (
                  <Typography>
                    {initialStatus === t("statuses.publish")
                      ? t("articles.lastPublishedAt", { date: dateString })
                      : t("articles.draftSavedAt", { date: dateString })}
                  </Typography>
                )}
                <Button
                  label={t("common.cancel")}
                  style="text"
                  type="reset"
                  onClick={onClose}
                />
                <ActionDropdown
                  buttonProps={{ type: "submit" }}
                  disabled={isSubmitting || !isValid || !dirty}
                  label={status}
                >
                  <Menu>
                    <MenuItem.Button
                      onClick={() => setStatus(t("statuses.publish"))}
                    >
                      {t("statuses.publish")}
                    </MenuItem.Button>
                    <MenuItem.Button
                      onClick={() => setStatus(t("statuses.saveDraft"))}
                    >
                      {t("statuses.saveDraft")}
                    </MenuItem.Button>
                  </Menu>
                </ActionDropdown>
                {isEdit && (
                  <Dropdown buttonStyle="text" icon={MenuHorizontal}>
                    <Dropdown.Menu>
                      <Dropdown.MenuItem.Button
                        style="danger"
                        onClick={handleDelete}
                      >
                        {t("common.delete")}
                      </Dropdown.MenuItem.Button>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
            <FormikEditor
              required
              addOns={EDITOR_ADDONS}
              className="mt-10"
              contentClassName="editor-content__wrapper new-article__container"
              menuClassName="w-full neeto-ui-bg-gray-200"
              name="body"
              placeholder={t("articles.placeholders.body")}
            >
              <div className="new-article__container px-4 ">
                <Textarea
                  autoFocus
                  nakedTextarea
                  className="scribble-new-article__title"
                  error={errors.title}
                  name="title"
                  placeholder={t("articles.placeholders.title")}
                  rows={DEFAULT_ROW_COUNT}
                  onChange={event => setFieldValue("title", event.target.value)}
                  onKeyDown={event =>
                    event.key === KEYBOARD_ENTER_KEY &&
                    !event.shiftKey &&
                    event.preventDefault()
                  }
                />
              </div>
            </FormikEditor>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
