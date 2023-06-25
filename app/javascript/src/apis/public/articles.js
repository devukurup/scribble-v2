import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const show = slug => axios.get(`${API_V1_BASE_URL}/public/articles/${slug}`);

const articlesApi = {
  show,
};

export default articlesApi;
