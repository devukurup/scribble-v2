import { useState } from "react";

import siteApi from "apis/site";

export const useUpdateSite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const update = async ({ payload, onSuccess = () => {} }) => {
    try {
      setIsLoading(true);
      await siteApi.update(payload);
      setIsError(false);
      onSuccess();
    } catch (error) {
      logger.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, update };
};
