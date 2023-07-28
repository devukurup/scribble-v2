import { useQuery, useQueryClient, useMutation } from "react-query";

import scheduleApi from "apis/articles/schedule";
import { QUERY_KEYS } from "constants/query";

const { ARTICLE_SCHEDULE } = QUERY_KEYS;

export const useShowSchedule = ({ id, options = {} }) =>
  useQuery([ARTICLE_SCHEDULE, id], () => scheduleApi.show(id), {
    ...options,
  });

export const useCreateSchedule = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ payload, id }) => scheduleApi.create({ id, payload }), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLE_SCHEDULE);
    },
  });
};

export const useDeleteSchedule = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => scheduleApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(ARTICLE_SCHEDULE);
    },
  });
};
