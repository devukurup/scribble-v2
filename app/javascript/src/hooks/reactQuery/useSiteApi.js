import { useMutation, useQuery, useQueryClient } from "react-query";

import siteApi from "apis/site";
import { QUERY_KEYS } from "constants/query";

const { SITE } = QUERY_KEYS;

export const useShowSite = (options = {}) =>
  useQuery([SITE], () => siteApi.show(), { ...options });

export const useUpdateSite = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(values => siteApi.update(values), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(SITE);
    },
  });
};
