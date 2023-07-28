import { useQuery } from "react-query";

import articlesApi from "apis/public/articles";
import { QUERY_KEYS } from "constants/query";

const { PUBLIC_ARTICLES } = QUERY_KEYS;

export const useShowArticle = ({ slug, options = {} }) =>
  useQuery([PUBLIC_ARTICLES, slug], () => articlesApi.show(slug), {
    ...options,
  });

export const useSearchArticles = ({ searchTerm = "", options = {} }) =>
  useQuery(
    [PUBLIC_ARTICLES, searchTerm],
    () => articlesApi.search(searchTerm),
    {
      ...options,
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
