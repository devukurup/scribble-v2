import { useMutation, useQueryClient } from "react-query";
import { LOAD_SESSION_KEY } from "src/constants";

import sessionApi from "apis/public/session";

export const useLoginSession = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => sessionApi.login(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_SESSION_KEY);
    },
  });
};
