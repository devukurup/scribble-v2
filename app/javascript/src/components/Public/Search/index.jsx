import { Search as NeetoUISearch } from "neetoicons";
import { Input } from "neetoui";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import useDebounce from "hooks/useDebounce";
import { useSearchArticles } from "hooks/reactQuery/public/useArticlesApi";
import Results from "./Results";

const Search = ({ isSearchBarOpen, setIsSearchBarOpen }) => {
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
          type="search"
          prefix={<NeetoUISearch />}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border-none"
          placeholder="Search for an article"
          size="large"
          autoFocus
        />
        {searchTerm.trim().length > 2 && (
          <Results
            isFetching={isFetching}
            articles={articles}
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
