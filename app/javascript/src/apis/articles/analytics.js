import axios from "axios";
import {
  API_V1_BASE_URL,
  DEFAULT_PAGE_NUMBER,
  PAGINATION_LIMIT,
} from "src/constants";

const list = ({
  page = DEFAULT_PAGE_NUMBER,
  limit = PAGINATION_LIMIT,
  order = "desc",
}) =>
  axios.get(`${API_V1_BASE_URL}/articles/analytics`, {
    params: {
      page,
      limit,
      order,
    },
  });

const analyticsApi = { list };

export default analyticsApi;
