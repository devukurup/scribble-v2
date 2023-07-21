import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { FormikEditor } from "neetoeditor";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography, Button, Spinner } from "neetoui";
import { Textarea, Select } from "neetoui/formik";
import { isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { CATEGORY_VALIDATION_SCHEMA } from "Dashboard/Categories/constants";
import { useShowSchedule } from "hooks/reactQuery/articles/useScheduleApi";
import {
  useFetchCategories,
  useCreateCategory,
} from "hooks/reactQuery/useCategoriesApi";

import ShowSchedule from "./Schedule/Show";
import StatusDropdown from "./StatusDropdown";

import {
  VALIDATION_SCHEMA,
  EDITOR_ADDONS,
  KEYBOARD_ENTER_KEY,
  DEFAULT_ROW_COUNT,
} from "../constants";
import {
  filteredErrors,
  formatCategories,
  formatTitleAndBodyErrors,
} from "../utils";

const Form = ({
  handleSubmit,
  initialValues,
  onClose,
  initialStatus,
  isEdit = false,
  handleDelete = () => {},
  setIsVersionsPaneOpen = () => {},
  dateString = "",
  isSubmitting,
}) => {
  const [status, setStatus] = useState(initialStatus);

  const { articleId } = useParams();

  const { data: { categories } = {}, isFetching: isFetchingCategories } =
    useFetchCategories({});

  const { isLoading: isCreatingCategories, mutate: createCategory } =
    useCreateCategory();

  const { data: { schedule } = {}, isLoading: isFetchingSchedule } =
    useShowSchedule({
      id: articleId,
      options: { enabled: isEdit },
    });

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
        createCategory(
          { title: title.trim() },
          {
            onSuccess: ({ category }) => {
              setFieldValue("category", {
                label: category?.title,
                value: category?.id,
              });
            },
          }
        );
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
        {({ errors, setFieldValue, isValid, dirty, setErrors }) => (
          <FormikForm>
            <div className="mx-4 flex items-center justify-between">
              <div className="w-96">
                {isFetchingCategories ? (
                  <Spinner />
                ) : (
                  <Select
                    isCreateable
                    isSearchable
                    isLoading={isFetchingCategories || isCreatingCategories}
                    name="category"
                    options={formatCategories(categories)}
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
                )}
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
                {isEdit && !isNil(schedule) ? (
                  <Button label={status} type="submit" />
                ) : (
                  <StatusDropdown
                    isEdit={isEdit}
                    setStatus={setStatus}
                    status={status}
                    isDisabled={
                      isEdit
                        ? !isValid || isSubmitting
                        : isSubmitting || !isValid || !dirty
                    }
                  />
                )}
                {isEdit && (
                  <Dropdown buttonStyle="text" icon={MenuHorizontal}>
                    <Dropdown.Menu>
                      <Dropdown.MenuItem.Button
                        style="danger"
                        onClick={handleDelete}
                      >
                        {t("common.delete")}
                      </Dropdown.MenuItem.Button>
                      <Dropdown.MenuItem.Button
                        onClick={() => setIsVersionsPaneOpen(true)}
                      >
                        {t("articles.versions.view")}
                      </Dropdown.MenuItem.Button>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
            <div className="mt-10">
              {isEdit && !isNil(schedule) && (
                <ShowSchedule
                  articleId={articleId}
                  isLoading={isFetchingSchedule}
                  schedule={schedule}
                />
              )}
              {!isEmpty(filteredErrors(errors)) && (
                <Typography className="neeto-ui-input__error p-1" style="body3">
                  {formatTitleAndBodyErrors(errors)}
                </Typography>
              )}
              <FormikEditor
                required
                addOns={EDITOR_ADDONS}
                contentClassName="editor-content__wrapper new-article__container"
                error={null}
                menuClassName="w-full neeto-ui-bg-gray-200"
                name="body"
                placeholder={t("articles.placeholders.body")}
              >
                <div className="new-article__container px-4 ">
                  <Textarea
                    autoFocus
                    nakedTextarea
                    className="scribble-new-article__title"
                    error={null}
                    name="title"
                    placeholder={t("articles.placeholders.title")}
                    rows={DEFAULT_ROW_COUNT}
                    onChange={event =>
                      setFieldValue("title", event.target.value)
                    }
                    onKeyDown={event =>
                      event.key === KEYBOARD_ENTER_KEY &&
                      !event.shiftKey &&
                      event.preventDefault()
                    }
                  />
                </div>
              </FormikEditor>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
