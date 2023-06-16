import { useState } from "react";

import categoriesApi from "apis/categories";

export const useUpdateCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const update = async ({
    id,
    payload,
    onSuccess = () => {},
    quiet = false,
  }) => {
    try {
      setIsLoading(true);
      await categoriesApi.update({
        id,
        payload,
        quiet,
      });
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
