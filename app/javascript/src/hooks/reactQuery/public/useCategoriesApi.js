import { useQuery } from "react-query";

import categoriesApi from "apis/public/categories";
import { QUERY_KEYS } from "constants/query";

const { PUBLIC_CATEGORIES } = QUERY_KEYS;

export const useFetchCategories = (options = {}) =>
  useQuery([PUBLIC_CATEGORIES], () => categoriesApi.list(), {
    ...options,
  });
