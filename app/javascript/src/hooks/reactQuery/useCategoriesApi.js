import { useQuery, useMutation, useQueryClient } from "react-query";

import categoriesApi from "apis/categories";
import { QUERY_KEYS } from "constants/query";

const { CATEGORIES } = QUERY_KEYS;

export const useFetchCategories = ({ searchTerm = "", options = {} }) =>
  useQuery([CATEGORIES, searchTerm], () => categoriesApi.list(searchTerm), {
    ...options,
    refetchOnWindowFocus: false,
  });

export const useUpdateCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, payload, isQuiet }) =>
      categoriesApi.update({ id, payload, quiet: isQuiet }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(CATEGORIES);
      },
    }
  );
};

export const useCreateCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => categoriesApi.create(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(CATEGORIES);
    },
  });
};

export const useDeleteCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => categoriesApi.destroy(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(CATEGORIES);
    },
  });
};
