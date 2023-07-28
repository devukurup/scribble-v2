import { useMutation, useQueryClient } from "react-query";

import sessionApi from "apis/public/session";
import { QUERY_KEYS } from "constants/query";

const { SESSION } = QUERY_KEYS;

export const useLoginSession = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => sessionApi.login(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(SESSION);
    },
  });
};
