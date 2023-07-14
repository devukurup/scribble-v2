import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const BASE_URL = articleId =>
  `${API_V1_BASE_URL}/articles/${articleId}/versions`;

const list = articleId => axios.get(BASE_URL(articleId));

const show = ({ articleId, id }) => axios.get(`${BASE_URL(articleId)}/${id}`);

const restore = ({ articleId, id }) =>
  axios.patch(`${BASE_URL(articleId)}/${id}/restore`);

const versionsApi = { list, show, restore };

export default versionsApi;
