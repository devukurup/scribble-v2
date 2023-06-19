import { useState, useEffect } from "react";

import articlesApi from "apis/articles";

export const useShowArticle = id => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const { data } = await articlesApi.show(id);
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
