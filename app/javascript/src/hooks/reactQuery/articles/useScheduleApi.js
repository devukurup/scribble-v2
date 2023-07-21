import { useQuery, useQueryClient, useMutation } from "react-query";
import { LOAD_ARTICLE_SCHEDULE_KEY } from "src/constants";

import scheduleApi from "apis/articles/schedule";

export const useShowSchedule = ({ id, options = {} }) =>
  useQuery([LOAD_ARTICLE_SCHEDULE_KEY, id], () => scheduleApi.show(id), {
    ...options,
  });

export const useCreateSchedule = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ payload, id }) => scheduleApi.create({ id, payload }), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_ARTICLE_SCHEDULE_KEY);
    },
  });
};

export const useDeleteSchedule = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(id => scheduleApi.destroy(id), {
    ...options,
    onSuccess: data => {
      options.onSuccess?.(data);
      queryClient.invalidateQueries(LOAD_ARTICLE_SCHEDULE_KEY);
    },
  });
};
