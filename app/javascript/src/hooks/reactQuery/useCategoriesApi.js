import { useQuery, useMutation, useQueryClient } from "react-query";
import { LOAD_CATEGORIES_KEY } from "src/constants";

import categoriesApi from "apis/categories";

export const useFetchCategories = ({ searchTerm = "", options = {} }) =>
  useQuery(
    [LOAD_CATEGORIES_KEY, searchTerm],
    () => categoriesApi.list(searchTerm),
    {
      ...options,
      refetchOnWindowFocus: false,
    }
  );

export const useUpdateCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, payload, isQuiet }) =>
      categoriesApi.update({ id, payload, quiet: isQuiet }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(LOAD_CATEGORIES_KEY);
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
      queryClient.invalidateQueries(LOAD_CATEGORIES_KEY);
    },
  });
};

export const useDeleteCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => categoriesApi.destroy(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_CATEGORIES_KEY);
    },
  });
};
