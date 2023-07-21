import dayjs from "dayjs";
import { range } from "ramda";

import { findBy } from "neetocommons/pure";

import { STATUS_DROPDOWN_MENU, ARTICLE_STATUSES } from "./constants";

export const filterStatusOptions = ({ isEdit, status }) => {
  const statusValue = findBy({ label: status }, STATUS_DROPDOWN_MENU).value;
  if (isEdit) {
    if (statusValue === ARTICLE_STATUSES.published) {
      return STATUS_DROPDOWN_MENU.filter(
        ({ value }) =>
          value === ARTICLE_STATUSES.draft ||
          value === ARTICLE_STATUSES.unpublishLater
      );
    }

    if (statusValue === ARTICLE_STATUSES.draft) {
      return STATUS_DROPDOWN_MENU.filter(
        ({ value }) =>
          value === ARTICLE_STATUSES.published ||
          value === ARTICLE_STATUSES.publishLater
      );
    }
  }

  return STATUS_DROPDOWN_MENU.filter(
    ({ value }) =>
      value === ARTICLE_STATUSES.published || value === ARTICLE_STATUSES.draft
  );
};

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
