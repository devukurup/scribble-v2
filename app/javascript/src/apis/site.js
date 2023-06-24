import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/site`;

const show = () => axios.get(BASE_URL);

const update = payload => axios.put(BASE_URL, { site: payload });

const siteApi = { show, update };

export default siteApi;
