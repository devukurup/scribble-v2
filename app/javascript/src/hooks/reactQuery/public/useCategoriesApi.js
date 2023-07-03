import { useQuery } from "react-query";
import { LOAD_PUBLIC_CATEGORIES_KEY } from "src/constants";

import categoriesApi from "apis/public/categories";

export const useFetchCategories = (options = {}) =>
  useQuery([LOAD_PUBLIC_CATEGORIES_KEY], () => categoriesApi.list(), {
    ...options,
  });
