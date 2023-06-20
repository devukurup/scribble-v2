import axios from "axios";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";

const BASE_URL = "/articles";

const list = ({
  page = DEFAULT_PAGE_NUMBER,
  limit = PAGINATION_LIMIT,
  search = "",
  status = "",
  selectedCategoryIds = [],
}) =>
  axios.get(BASE_URL, {
    params: {
      page,
      limit,
      search_term: search,
      status,
      category_ids: selectedCategoryIds,
    },
  });

const create = payload => axios.post(BASE_URL, { article: payload });

const show = id => axios.get(`${BASE_URL}/${id}`);

const update = ({ id, payload }) =>
  axios.put(`${BASE_URL}/${id}`, { article: payload });

const destroy = id => axios.delete(`${BASE_URL}/${id}`);

const articlesApi = { list, create, update, show, destroy };

export default articlesApi;
