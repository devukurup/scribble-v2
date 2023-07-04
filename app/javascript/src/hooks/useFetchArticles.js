import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "../constants";

export const useFetchArticles = selectedCategoryIds => {
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || DEFAULT_PAGE_NUMBER;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  return useFetchArticles({
    page,
    limit,
    search,
    status: status.toLowerCase(),
    selectedCategoryIds,
  });
};
