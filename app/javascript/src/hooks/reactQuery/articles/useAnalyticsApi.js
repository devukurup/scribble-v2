import { useQuery } from "react-query";
import { LOAD_ANALYTICS_KEY } from "src/constants";

import analyticsApi from "apis/articles/analytics";

export const useFetchAnalytics = ({ params = {}, options }) =>
  useQuery([LOAD_ANALYTICS_KEY, params], () => analyticsApi.list(params), {
    keepPreviousData: true,
    ...options,
  });
