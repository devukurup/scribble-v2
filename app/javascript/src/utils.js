import dayjs from "dayjs";
import { complement, concat, either, isEmpty, isNil, slice } from "ramda";

import { DATE_TIME_FORMAT, TITLE_TRUNCATE_LENGTH } from "./constants";

export const isPresent = complement(either(isEmpty, isNil));

export const formattedDate = dateTime =>
  dayjs(dateTime).format(DATE_TIME_FORMAT);

export const truncate = string =>
  string.length > TITLE_TRUNCATE_LENGTH
    ? concat(slice(0, TITLE_TRUNCATE_LENGTH, string), "...")
    : string;
