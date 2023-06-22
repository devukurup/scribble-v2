import axios from "axios";

const BASE_URL = "/site";

const show = () => axios.get(BASE_URL);

const update = payload => axios.put(BASE_URL, { site: payload });

const siteApi = { show, update };

export default siteApi;
