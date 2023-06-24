import axios from "axios";
import {
  API_V1_BASE_URL,
  DEFAULT_PAGE_NUMBER,
  PAGINATION_LIMIT,
} from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/articles`;

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

const bulkUpdateArticles = payload =>
  axios.patch(`${BASE_URL}/bulk_update`, payload);

const bulkDeleteArticles = payload =>
  axios.delete(`${BASE_URL}/bulk_destroy`, { data: payload });

const articlesApi = {
  list,
  create,
  update,
  show,
  destroy,
  bulkUpdateArticles,
  bulkDeleteArticles,
};

export default articlesApi;
