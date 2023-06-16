import { complement, curry, either, isEmpty, isNil } from "ramda";

const matchesImpl = (pattern, object, __parent = object) => {
  if (object === pattern) return true;

  if (typeof pattern === "function" && pattern(object, __parent)) return true;

  if (isNil(pattern) || isNil(object)) return false;

  if (typeof pattern !== "object") return false;

  return Object.entries(pattern).every(([key, value]) =>
    matchesImpl(value, object[key], __parent)
  );
};

const matches = curry((pattern, object) => matchesImpl(pattern, object));

export const findBy = curry((pattern, array) => array.find(matches(pattern)));

export const isPresent = complement(either(isEmpty, isNil));

export const findIndexBy = curry((pattern, array) =>
  array.findIndex(matches(pattern))
);
