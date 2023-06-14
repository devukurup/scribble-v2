import axios from "axios";

const BASE_URL = "/categories";

const list = () => axios.get(BASE_URL);

const create = payload => axios.post(BASE_URL, { category: payload });

const update = ({ id, payload }) =>
  axios.put(`${BASE_URL}/${id}`, { category: payload });

const categoriesApi = { list, create, update };

export default categoriesApi;
