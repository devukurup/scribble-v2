import axios from "axios";

const BASE_URL = "/articles";

const list = () => axios.get(BASE_URL);

const create = payload => axios.post(BASE_URL, { article: payload });

const update = ({ id, payload }) =>
  axios.put(`${BASE_URL}/${id}`, { article: payload });

const articlesApi = { list, create, update };

export default articlesApi;
