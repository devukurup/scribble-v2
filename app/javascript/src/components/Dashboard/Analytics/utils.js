import { DEFAULT_PAGE_NUMBER } from "src/constants";

export const initializePageNumber = () => {
  const page = new URLSearchParams(window.location.search).get("page");

  return parseInt(page) || DEFAULT_PAGE_NUMBER;
};

export const buildPageSearchParam = page => {
  const currentUrlParams = new URLSearchParams(window.location.search);
  currentUrlParams.set("page", page);

  return currentUrlParams;
};
