import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/public/articles`;

const show = slug => axios.get(`${BASE_URL}/${slug}`);

const search = searchTerm =>
  axios.get(`${BASE_URL}/search`, { params: { searchTerm } });

const articlesApi = {
  show,
  search,
};

export default articlesApi;
