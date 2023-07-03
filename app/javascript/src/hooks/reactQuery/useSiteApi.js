import { useMutation, useQuery, useQueryClient } from "react-query";
import { LOAD_SITE_KEY } from "src/constants";

import siteApi from "apis/site";

export const useShowSite = (options = {}) =>
  useQuery([LOAD_SITE_KEY], () => siteApi.show(), { ...options });

export const useUpdateSite = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(values => siteApi.update(values), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_SITE_KEY);
    },
  });
};
