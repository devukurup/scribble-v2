import { useQuery, useMutation, useQueryClient } from "react-query";

import redirectionsApi from "apis/redirections";
import { QUERY_KEYS } from "constants/query";

const { REDIRECTIONS } = QUERY_KEYS;

export const useFetchRedirections = (options = {}) =>
  useQuery([REDIRECTIONS], () => redirectionsApi.list(), options);

export const useUpdateRedirection = ({ isQuiet = false, options = {} }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, payload }) =>
      redirectionsApi.update({ id, payload, quiet: isQuiet }),
    {
      ...options,
      onSuccess: data => {
        options.onSuccess?.(data);
        queryClient.invalidateQueries(REDIRECTIONS);
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
      queryClient.invalidateQueries(REDIRECTIONS);
    },
  });
};

export const useDeleteRedirection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => redirectionsApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(REDIRECTIONS);
    },
  });
};
