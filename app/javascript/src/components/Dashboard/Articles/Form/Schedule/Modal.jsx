import React from "react";

import { Formik, Form as FormikForm, Field } from "formik";
import {
  Typography,
  Modal as NeetoUIModal,
  Button,
  DatePicker,
  TimePicker,
} from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useCreateSchedule } from "hooks/reactQuery/articles/useScheduleApi";

import { INITIAL_VALUES, TIME_FORMAT, VALIDATION_SCHEMA } from "../constants";
import {
  isHoursInPast,
  mergeDateAndTime,
  isMinutesInPast,
  isDateInPast,
} from "../utils";

const Modal = ({ isOpen, onClose, scheduleEvent, setScheduleEvent }) => {
  const { articleId } = useParams();

  const { t } = useTranslation();

  const handleSuccess = () => {
    setScheduleEvent("");
    onClose();
  };

  const { mutate: createSchedule, isLoading: isCreating } = useCreateSchedule({
    onSuccess: handleSuccess,
  });

  const handleSchedule = values => {
    const { time, date } = values;
    const id = articleId;
    const payload = {
      event: scheduleEvent,
      time: mergeDateAndTime({ time, date }),
    };
    createSchedule({ id, payload });
  };

  return (
    <NeetoUIModal isOpen={isOpen} onClose={onClose}>
      <NeetoUIModal.Header>
        <Typography style="h4" weight="semibold">
          {t("articles.schedule.modalTitle", { event: scheduleEvent })}
        </Typography>
      </NeetoUIModal.Header>
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSchedule}
      >
        {({ isValid, dirty, values }) => (
          <FormikForm noValidate>
            <NeetoUIModal.Body className="space-y-2">
              <div className="flex w-5/6 flex-row justify-between space-x-5">
                <Field name="date">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <DatePicker
                      className="w-full"
                      defaultValue={values.date}
                      disabledDate={isDateInPast}
                      error={meta.touched ? meta.error : ""}
                      getPopupContainer={prop("parentNode")}
                      label={t("common.date")}
                      placeholder={t("articles.schedule.placeholders.date")}
                      {...field}
                      onChange={date => setFieldValue("date", date)}
                    />
                  )}
                </Field>
                <Field name="time">
                  {({ field, meta, form: { setFieldValue } }) => (
                    <TimePicker
                      className="w-full"
                      defaultValue={values.time}
                      disabledHours={() => isHoursInPast(values.date)}
                      error={meta.touched ? meta.error : ""}
                      format={TIME_FORMAT}
                      getPopupContainer={prop("parentNode")}
                      label={t("common.time")}
                      placeholder={t("articles.schedule.placeholders.time")}
                      showNow={false}
                      disabledMinutes={hour =>
                        isMinutesInPast(values.date, hour)
                      }
                      {...field}
                      onChange={time => setFieldValue("time", time)}
                    />
                  )}
                </Field>
              </div>
            </NeetoUIModal.Body>
            <NeetoUIModal.Footer className="space-x-2">
              <Button
                disabled={isCreating || !isValid || !dirty}
                label={t("common.continue")}
                loading={isCreating}
                type="submit"
              />
              <Button
                label={t("common.cancel")}
                style="text"
                type="reset"
                onClick={onClose}
              />
            </NeetoUIModal.Footer>
          </FormikForm>
        )}
      </Formik>
    </NeetoUIModal>
  );
};

export default Modal;
