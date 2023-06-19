import { useState } from "react";

import articlesApi from "apis/articles";

export const useUpdateArticles = () => {
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
      await articlesApi.update({
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
