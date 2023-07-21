import axios from "axios";
import { API_V1_BASE_URL } from "src/constants";

const buildBaseUrl = articleId =>
  `${API_V1_BASE_URL}/articles/${articleId}/versions`;

const list = articleId => axios.get(buildBaseUrl(articleId));

const show = ({ articleId, id }) =>
  axios.get(`${buildBaseUrl(articleId)}/${id}`);

const restore = ({ articleId, id }) =>
  axios.patch(`${buildBaseUrl(articleId)}/${id}/restore`);

const versionsApi = { list, show, restore };

export default versionsApi;
