import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/redirections`;

const list = () => axios.get(BASE_URL);

const create = payload => axios.post(BASE_URL, { redirection: payload });

const update = ({ id, payload }) =>
  axios.put(`${BASE_URL}/${id}`, { redirection: payload });

const destroy = id => axios.delete(`${BASE_URL}/${id}`);

const redirectionsApi = {
  list,
  create,
  update,
  destroy,
};

export default redirectionsApi;
