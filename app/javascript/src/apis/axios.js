import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";

import { getFromSessionStorage } from "helpers/session";

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

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  const error = axiosErrorObject.response.data.error;
  Toastr.error(Error(error || t("common.defaultError")));

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () =>
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);

export { setAuthHeaders, registerIntercepts };
