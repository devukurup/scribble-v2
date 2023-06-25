import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const list = () => axios.get(`${API_V1_BASE_URL}/public/categories`);

const categoriesApi = {
  list,
};

export default categoriesApi;
