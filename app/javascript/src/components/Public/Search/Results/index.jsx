import { Spinner, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import React from "react";
import Result from "./Result";
import routes from "src/routes";
import { buildUrl } from "neetocommons/utils";

const Results = ({ isFetching, articles, searchTerm, setIsSearchBarOpen }) => {
  const history = useHistory();

  const handleSelect = slug => {
    setIsSearchBarOpen(false);
    history.push(buildUrl(routes.public.articles.show, { slug }));
  };

  if (isFetching) {
    return (
      <div className="flex h-16 w-full items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (isEmpty(articles)) {
    return (
      <div className="flex h-16 w-full items-center justify-center bg-white">
        <Typography>No articles found!</Typography>
      </div>
    );
  }

  return (
    <div className="flex max-h-80 w-full flex-col overflow-scroll rounded-b-sm bg-white">
      {articles.map(({ slug, body, title }) => (
        <Result
          key={slug}
          title={title}
          searchTerm={searchTerm}
          body={body}
          onClick={() => handleSelect(slug)}
        />
      ))}
    </div>
  );
};

export default Results;
