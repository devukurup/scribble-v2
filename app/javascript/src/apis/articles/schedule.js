import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/articles`;

const show = id => axios.get(`${BASE_URL}/${id}/schedule`);

const create = ({ payload, id }) =>
  axios.post(`${BASE_URL}/${id}/schedule`, { schedule: payload });

const destroy = id => axios.delete(`${BASE_URL}/${id}/schedule`);

const scheduleApi = { show, create, destroy };

export default scheduleApi;
