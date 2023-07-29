import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { FormikEditor } from "neetoeditor";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography, Button, Spinner } from "neetoui";
import { Textarea, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ENTER_KEY } from "src/constants";

import { CATEGORY_VALIDATION_SCHEMA } from "Dashboard/Categories/constants";
import { useShowSchedule } from "hooks/reactQuery/articles/useScheduleApi";
import {
  useFetchCategories,
  useCreateCategory,
} from "hooks/reactQuery/useCategoriesApi";
import { noop, isNotEmpty, isNotNil } from "neetocommons/pure";

import {
  DEFAULT_ROW_COUNT,
  EDITOR_ADDONS,
  STATUS_DROPDOWN_MENU,
} from "./constants";
import ShowSchedule from "./Schedule/Show";
import StatusDropdown from "./StatusDropdown";
import { filteredErrors, formatTitleAndBodyErrors } from "./utils";

import { VALIDATION_SCHEMA } from "../constants";
import { formatCategories } from "../utils";

const Form = ({
  handleSubmit,
  initialValues,
  onClose,
  initialStatus,
  isEdit = false,
  handleDelete = noop,
  setIsVersionsPaneOpen = noop,
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
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
                      {initialStatus === STATUS_DROPDOWN_MENU[0]
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
                  {isEdit && isNotNil(schedule) ? (
                    <Button
                      disabled={!isValid || isSubmitting || !dirty}
                      label={initialStatus.label}
                      loading={isSubmitting}
                      type="submit"
                    />
                  ) : (
                    <StatusDropdown
                      articleStatus={initialStatus}
                      isEdit={isEdit}
                      isSubmitting={isSubmitting}
                      setStatus={setStatus}
                      status={status}
                      isDisabled={
                        isSubmitting ||
                        !isValid ||
                        (!dirty && initialStatus === status)
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
              {isEdit && isNotNil(schedule) && (
                <ShowSchedule
                  articleId={articleId}
                  isLoading={isFetchingSchedule}
                  schedule={schedule}
                />
              )}
            </div>
            <div className="mt-5">
              {isNotEmpty(filteredErrors(errors)) && (
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
                      event.key === ENTER_KEY &&
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
