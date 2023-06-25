import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Close, Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import Row from "./Row";
import Cell from "./Row/Cell";

import { FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ initialValues, onSubmit, onClose }) => (
  <Formik
    validateOnBlur
    validateOnChange
    initialValues={initialValues}
    validationSchema={FORM_VALIDATION_SCHEMA}
    onSubmit={onSubmit}
  >
    {({ dirty }) => (
      <FormikForm noValidate>
        <Row className="bg-white">
          <div className="flex w-full flex-col">
            <div className="flex w-full items-start">
              <Cell>
                <Input name="from" placeholder="/articles/welcome" />
              </Cell>
              <Cell>
                <Input name="to" placeholder="https://spinkart.scribble.com/" />
              </Cell>
            </div>
          </div>
          <Cell className="flex w-16 space-x-2">
            <Button disabled={!dirty} icon={Check} style="text" type="submit" />
            <Button icon={Close} style="text" type="reset" onClick={onClose} />
          </Cell>
        </Row>
      </FormikForm>
    )}
  </Formik>
);

export default Form;
