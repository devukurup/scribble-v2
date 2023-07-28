import { useMutation, useQuery, useQueryClient } from "react-query";

import versionsApi from "apis/articles/versions";
import { QUERY_KEYS } from "constants/query";

const { ARTICLE_VERSIONS } = QUERY_KEYS;

export const useFetchVersions = ({ articleId, options = {} }) =>
  useQuery([ARTICLE_VERSIONS, articleId], () => versionsApi.list(articleId), {
    ...options,
    refetchOnWindowFocus: false,
  });

export const useShowVersion = ({ articleId, id, options = {} }) =>
  useQuery([articleId, id], () => versionsApi.show({ articleId, id }), {
    ...options,
  });

export const useRestoreVersion = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ articleId, id }) => versionsApi.restore({ articleId, id }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(ARTICLE_VERSIONS);
      },
    }
  );
};
