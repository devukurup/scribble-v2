import React, { useState, useEffect } from "react";

import { Search as NeetoUISearch } from "neetoicons";
import { Input } from "neetoui";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

import { useSearchArticles } from "hooks/reactQuery/public/useArticlesApi";
import useDebounce from "hooks/useDebounce";

import { DEFAULT_SEARCH_LENGTH } from "./constants";
import Results from "./Results";

const Search = ({ setIsSearchBarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const debouncedSearchTerm = useDebounce(searchTerm);

  const {
    data: { articles } = {},
    refetch,
    isFetching,
  } = useSearchArticles({
    searchTerm: debouncedSearchTerm.trim(),
  });

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim().length > DEFAULT_SEARCH_LENGTH) refetch();
  }, [debouncedSearchTerm]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-400 bg-opacity-80 "
      onClick={() => setIsSearchBarOpen(false)}
    >
      <div
        className="flex w-1/2 flex-col"
        onClick={event => event.stopPropagation()}
      >
        <Input
          autoFocus
          className="w-full border-none"
          placeholder={t("public.search")}
          prefix={<NeetoUISearch />}
          size="large"
          type="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        {debouncedSearchTerm.trim().length > DEFAULT_SEARCH_LENGTH && (
          <Results
            articles={articles ?? []}
            isFetching={isFetching}
            searchTerm={searchTerm}
            setIsSearchBarOpen={setIsSearchBarOpen}
          />
        )}
      </div>
    </div>,

    document.body
  );
};

export default Search;
