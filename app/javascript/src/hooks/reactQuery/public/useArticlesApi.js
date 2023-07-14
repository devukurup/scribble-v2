import { useQuery } from "react-query";

import articlesApi from "apis/public/articles";
import { LOAD_PUBLIC_ARTICLES_KEY } from "src/constants";

export const useShowArticle = ({ slug, options = {} }) =>
  useQuery([LOAD_PUBLIC_ARTICLES_KEY, slug], () => articlesApi.show(slug), {
    ...options,
  });

export const useSearchArticles = ({ searchTerm = "", options = {} }) =>
  useQuery(
    [LOAD_PUBLIC_ARTICLES_KEY, searchTerm],
    () => articlesApi.search(searchTerm),
    {
      ...options,
    }
  );
