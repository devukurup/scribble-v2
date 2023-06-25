import { useState, useEffect } from "react";

import categoriesApi from "apis/categories";

export const useFetchCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async (searchTerm = "") => {
    try {
      setIsLoading(true);
      const { data } = await categoriesApi.list(searchTerm.trim());
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
