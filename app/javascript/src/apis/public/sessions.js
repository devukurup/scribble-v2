import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const login = payload =>
  axios.post(`${API_V1_BASE_URL}/public/sessions`, payload);

const sessionsApi = {
  login,
};

export default sessionsApi;
