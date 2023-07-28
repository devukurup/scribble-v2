import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { evolve, pipe } from "ramda";

import { getFromSessionStorage } from "helpers/session";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocommons/pure";
import { useErrorDisplayStore } from "neetocommons/react-utils";

axios.defaults.baseURL = "/";

const authToken = getFromSessionStorage("authToken");

const setAuthHeaders = (setIsLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };

  authToken && (axios.defaults.headers["X-Auth-Token"] = authToken);

  setIsLoading(false);
};

const transformDataToSnakeCase = request =>
  evolve(
    { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
    request
  );

const transformErrorKeysToCamelCase = error => {
  if (error.response?.data) {
    error.response.data = keysToCamelCase(error.response.data);
  }

  return error;
};

const handleNotFoundError = axiosError => {
  if (axiosError.response.status === 404) {
    useErrorDisplayStore.setState({ showErrorPage: true, statusCode: 404 });
  }

  return axiosError;
};

const showErrorToastr = axiosError => {
  const error = axiosError.response.data.error;
  if (axiosError.response.status !== 404) {
    Toastr.error(Error(error || t("common.defaultError")));
  }

  return axiosError;
};

const transformSuccessKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);

  return response;
};

const showSuccessToastr = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const extractData = response => {
  if (response.config.skipPullDataFromResponse) {
    return response;
  }

  return response.data;
};

const handleSuccessResponse = pipe(
  transformSuccessKeysToCamelCase,
  showSuccessToastr,
  extractData
);

const rejectError = error => Promise.reject(error);

const handleErrorResponse = pipe(
  transformErrorKeysToCamelCase,
  handleNotFoundError,
  showErrorToastr,
  rejectError
);

const registerIntercepts = () => {
  axios.interceptors.request.use(transformDataToSnakeCase);
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

export { setAuthHeaders, registerIntercepts };
