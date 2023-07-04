import { useQuery, useQueryClient, useMutation } from "react-query";
import { LOAD_ARTICLES_KEY } from "src/constants";

import articlesApi from "apis/articles";

export const useFetchArticles = ({ params, options }) =>
  useQuery([LOAD_ARTICLES_KEY, params], () => articlesApi.list(params), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...options,
  });

export const useShowArticle = ({ id, options = {} }) =>
  useQuery([LOAD_ARTICLES_KEY, id], () => articlesApi.show(id), {
    ...options,
  });

export const useCreateArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => articlesApi.create(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_ARTICLES_KEY);
    },
  });
};

export const useUpdateArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ id, payload }) => articlesApi.update({ id, payload }), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_ARTICLES_KEY);
    },
  });
};

export const useDeleteArticle = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => articlesApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_ARTICLES_KEY);
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
        queryClient.invalidateQueries(LOAD_ARTICLES_KEY);
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
      queryClient.invalidateQueries(LOAD_ARTICLES_KEY);
    },
  });
};
