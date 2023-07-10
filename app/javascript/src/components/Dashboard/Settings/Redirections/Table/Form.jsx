import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Close, Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import { FORM_VALIDATION_SCHEMA } from "Dashboard/Settings/Redirections/constants";

import { FROM_PATH_PLACHOLDER, TO_PATH_PLACEHOLDER } from "./constants";
import Row from "./Row";
import Cell from "./Row/Cell";
import { formatPaths } from "./utils";

const Form = ({ isSubmitting = false, initialValues, onSubmit, onClose }) => (
  <Formik
    validateOnBlur
    validateOnChange
    initialValues={initialValues}
    validationSchema={FORM_VALIDATION_SCHEMA}
    onSubmit={values => onSubmit(formatPaths(values))}
  >
    {({ dirty }) => (
      <FormikForm noValidate>
        <Row className="bg-white">
          <div className="flex w-full flex-col">
            <div className="flex w-full items-start">
              <Cell>
                <Input
                  name="from"
                  placeholder={FROM_PATH_PLACHOLDER}
                  size="large"
                />
              </Cell>
              <Cell>
                <Input
                  name="to"
                  placeholder={TO_PATH_PLACEHOLDER}
                  size="large"
                />
              </Cell>
            </div>
          </div>
          <Cell className="flex w-16 space-x-2">
            <Button
              disabled={!dirty || isSubmitting}
              icon={Check}
              loading={isSubmitting}
              style="text"
              type="submit"
            />
            <Button icon={Close} style="text" type="reset" onClick={onClose} />
          </Cell>
        </Row>
      </FormikForm>
    )}
  </Formik>
);

export default Form;
