import React, { useState } from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { ActionDropdown } from "@bigbinary/neetoui";
import { Formik, Form as FormikForm } from "formik";
import { Button, PageLoader } from "neetoui";
import { Textarea, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/useFetchCategories";

import { VALIDATION_SCHEMA, EDITOR_ADDONS } from "./constants";
import { formatCategories } from "./utils";

const { Menu, MenuItem } = ActionDropdown;

const Form = ({ handleSubmit, initialValues }) => {
  const { data: categories, isLoading } = useFetchCategories();
  const [status, setStatus] = useState("Publish");

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="my-4 w-full">
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, isValid, dirty, isSubmitting }) => (
          <FormikForm>
            <div className="mx-4 flex items-center justify-between">
              <div className="w-96">
                <Select
                  isSearchable
                  name="category"
                  options={formatCategories(categories)}
                  placeholder={t("articles.selectCategory")}
                />
              </div>
              <div className="flex space-x-3">
                <Button label={t("common.cancel")} style="text" type="reset" />
                <div>
                  <ActionDropdown
                    disabled={isSubmitting || !isValid || !dirty}
                    label={status}
                    type="submit"
                  >
                    <Menu>
                      <MenuItem.Button
                        onClick={() => setStatus(t("articles.publish"))}
                      >
                        {t("articles.publish")}
                      </MenuItem.Button>
                      <MenuItem.Button
                        onClick={() => setStatus(t("articles.saveDraft"))}
                      >
                        {t("articles.saveDraft")}
                      </MenuItem.Button>
                    </Menu>
                  </ActionDropdown>
                </div>
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
                  rows={1}
                  onChange={event => setFieldValue("title", event.target.value)}
                  onKeyDown={event =>
                    event.key === "Enter" &&
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
