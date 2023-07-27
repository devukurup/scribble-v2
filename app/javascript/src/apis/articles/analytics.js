import axios from "axios";
import {
  API_V1_BASE_URL,
  DEFAULT_PAGE_NUMBER,
  PAGINATION_LIMIT,
} from "src/constants";

const BASE_URL = `${API_V1_BASE_URL}/articles/analytics`;

const list = ({
  page = DEFAULT_PAGE_NUMBER,
  limit = PAGINATION_LIMIT,
  order = "desc",
}) =>
  axios.get(BASE_URL, {
    params: {
      page,
      limit,
      order,
    },
  });

const generatePdf = () => axios.post(`${BASE_URL}/generate_pdf`, {});

const downloadPdf = () =>
  axios.get(`${BASE_URL}/download_pdf`, {
    responseType: "blob",
    skipPullDataFromResponse: true,
  });

const analyticsApi = { list, generatePdf, downloadPdf };

export default analyticsApi;
