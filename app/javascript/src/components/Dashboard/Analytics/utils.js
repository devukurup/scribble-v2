import { DEFAULT_PAGE_NUMBER } from "src/constants";

export const initializePageNumber = () => {
  const page = new URLSearchParams(window.location.search).get("page");

  return page || DEFAULT_PAGE_NUMBER;
};
