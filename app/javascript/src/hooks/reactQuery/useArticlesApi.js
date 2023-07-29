import { useQuery, useQueryClient, useMutation } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";

const { CATEGORIES, ARTICLES } = QUERY_KEYS;

export const useFetchArticles = ({ params, options }) =>
  useQuery([ARTICLES, params], () => articlesApi.list(params), {
    keepPreviousData: true,
    ...options,
  });

export const useShowArticle = ({ id, options = {} }) =>
  useQuery([ARTICLES, id], () => articlesApi.show(id), {
    ...options,
  });

export const useCreateArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => articlesApi.create(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLES);
    },
  });
};

export const useUpdateArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ id, payload }) => articlesApi.update({ id, payload }), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLES);
      queryClient.invalidateQueries(CATEGORIES);
    },
  });
};

export const useDeleteArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => articlesApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLES);
      queryClient.invalidateQueries(CATEGORIES);
    },
  });
};

export const useBulkDeleteArticles = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    article_ids => articlesApi.bulkDeleteArticles({ article_ids }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(ARTICLES);
        queryClient.invalidateQueries(CATEGORIES);
      },
    }
  );
};

export const useBulkUpdateArticles = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => articlesApi.bulkUpdateArticles(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLES);
      queryClient.invalidateQueries(CATEGORIES);
    },
  });
};
