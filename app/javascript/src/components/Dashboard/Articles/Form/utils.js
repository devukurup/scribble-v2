import dayjs from "dayjs";
import { join, pick, values, range } from "ramda";

import { matches } from "neetocommons/pure";

import { STATUS_DROPDOWN_MENU, TITLE_BODY_KEYS } from "./constants";

export const filterStatusOptions = ({ isEdit, status, articleStatus }) =>
  STATUS_DROPDOWN_MENU.filter(({ pattern }) =>
    matches(pattern, {
      status: status.value,
      articleStatus: articleStatus.value,
      isEdit,
    })
  );

export const isDateInPast = date => date < dayjs().startOf("day");

export const isHoursInPast = date => {
  if (dayjs().isSame(date, "date")) return range(0, dayjs().hour());

  return [];
};

export const isMinutesInPast = (date, hour) => {
  if (dayjs().isSame(date, "date") && hour === dayjs().hour()) {
    return range(0, dayjs().minute() + 1);
  }

  return [];
};

export const mergeDateAndTime = ({ time, date }) =>
  dayjs(date).set("hour", time.hour()).set("minute", time.minute());

export const filteredErrors = errors => pick(TITLE_BODY_KEYS, errors);

export const formatTitleAndBodyErrors = errors =>
  join(", ", values(filteredErrors(errors)));
