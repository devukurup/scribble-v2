import React, { useState } from "react";

import { Search as NeetoUISearch } from "neetoicons";
import { Input } from "neetoui";
import ReactDOM from "react-dom";

import { useSearchArticles } from "hooks/reactQuery/public/useArticlesApi";
import useDebounce from "hooks/useDebounce";

import Results from "./Results";

const Search = ({ setIsSearchBarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data: { articles } = {}, isFetching } = useSearchArticles({
    searchTerm: debouncedSearchTerm.trim(),
  });

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

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
          placeholder="Search for an article"
          prefix={<NeetoUISearch />}
          size="large"
          type="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm.trim().length > 2 && (
          <Results
            articles={articles}
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
