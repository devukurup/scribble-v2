import { useQuery, useMutation } from "react-query";

import analyticsApi from "apis/articles/analytics";
import { QUERY_KEYS } from "constants/query";

const { ANALYTICS, ANALYTICS_DOWNLOAD } = QUERY_KEYS;

export const useFetchAnalytics = ({ params = {}, options }) =>
  useQuery([ANALYTICS, params], () => analyticsApi.list(params), {
    keepPreviousData: true,
    ...options,
  });

export const useGeneratePdf = (options = {}) =>
  useMutation(() => analyticsApi.generatePdf(), {
    ...options,
  });

export const useDownloadPdf = (options = {}) =>
  useQuery([ANALYTICS_DOWNLOAD], () => analyticsApi.downloadPdf(), {
    enabled: false,
    ...options,
  });
