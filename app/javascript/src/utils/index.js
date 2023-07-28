import { DATE_TIME_FORMAT, TITLE_TRUNCATE_LENGTH } from "constants";

import dayjs from "dayjs";
import { concat, slice } from "ramda";

export const formattedDate = dateTime =>
  dayjs(dateTime).format(DATE_TIME_FORMAT);

export const truncate = string =>
  string.length > TITLE_TRUNCATE_LENGTH
    ? concat(slice(0, TITLE_TRUNCATE_LENGTH, string), "...")
    : string;

export const isEven = number => number % 2 === 0;
