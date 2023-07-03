import { useQuery, useMutation, useQueryClient } from "react-query";
import { LOAD_REDIRECTIONS_KEY } from "src/constants";

import redirectionsApi from "apis/redirections";

export const useFetchRedirections = (options = {}) =>
  useQuery([LOAD_REDIRECTIONS_KEY], () => redirectionsApi.list(), options);

export const useUpdateRedirection = ({ isQuiet = false, options = {} }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, payload }) =>
      redirectionsApi.update({ id, payload, quiet: isQuiet }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(LOAD_REDIRECTIONS_KEY);
      },
    }
  );
};

export const useCreateRedirection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(payload => redirectionsApi.create(payload), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_REDIRECTIONS_KEY);
    },
  });
};
export const useDeleteRedirection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => redirectionsApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_REDIRECTIONS_KEY);
    },
  });
};
