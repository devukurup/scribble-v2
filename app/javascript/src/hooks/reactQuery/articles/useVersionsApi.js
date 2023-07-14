import { useMutation, useQuery, useQueryClient } from "react-query";
import { LOAD_ARTICLE_VERSIONS_KEY } from "src/constants";

import versionsApi from "apis/articles/versions";

export const useFetchVersions = ({ articleId, options = {} }) =>
  useQuery(
    [LOAD_ARTICLE_VERSIONS_KEY, articleId],
    () => versionsApi.list(articleId),
    {
      ...options,
      refetchOnWindowFocus: false,
    }
  );

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
        queryClient.invalidateQueries(LOAD_ARTICLE_VERSIONS_KEY);
      },
    }
  );
};
