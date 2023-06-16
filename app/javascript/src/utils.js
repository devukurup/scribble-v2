import { complement, either, isEmpty, isNil } from "ramda";

export const isPresent = complement(either(isEmpty, isNil));
