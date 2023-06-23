import { useState, useEffect } from "react";

import siteApi from "apis/site";

export const useShowSite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const { data } = await siteApi.show();
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
