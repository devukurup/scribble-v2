import axios from "axios";

const BASE_URL = "/categories";

const list = searchTerm =>
  axios.get(BASE_URL, { params: { search_term: searchTerm } });

const create = payload => axios.post(BASE_URL, { category: payload });

const update = ({ id, payload, quiet = false }) => {
  const path = quiet ? `${BASE_URL}/${id}?quiet` : `${BASE_URL}/${id}`;

  return axios.put(path, { category: payload });
};

const categoriesApi = { list, create, update };

export default categoriesApi;
