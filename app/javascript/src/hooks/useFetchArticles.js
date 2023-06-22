import { useState } from "react";

import articlesApi from "apis/articles";

import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "../constants";

export const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || DEFAULT_PAGE_NUMBER;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const refetch = async (selectedCategories = []) => {
    const selectedCategoryIds = selectedCategories?.map(({ id }) => id);
    try {
      setIsLoading(true);
      const { data } = await articlesApi.list({
        page,
        limit,
        search,
        status: status.toLowerCase(),
        selectedCategoryIds,
      });
      setData(data);
      setIsError(false);
    } catch (error) {
      logger.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, data, refetch };
};
