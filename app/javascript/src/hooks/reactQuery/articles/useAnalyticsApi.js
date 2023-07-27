import { useQuery, useMutation } from "react-query";
import { LOAD_ANALYTICS_KEY, LOAD_ANALYTICS_DOWNLOAD_KEY } from "src/constants";

import analyticsApi from "apis/articles/analytics";

export const useFetchAnalytics = ({ params = {}, options }) =>
  useQuery([LOAD_ANALYTICS_KEY, params], () => analyticsApi.list(params), {
    keepPreviousData: true,
    ...options,
  });

export const useGeneratePdf = (options = {}) =>
  useMutation(() => analyticsApi.generatePdf(), {
    ...options,
  });

export const useDownloadPdf = (options = {}) =>
  useQuery([LOAD_ANALYTICS_DOWNLOAD_KEY], () => analyticsApi.downloadPdf(), {
    enabled: false,
    ...options,
  });
