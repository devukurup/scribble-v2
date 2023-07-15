import React from "react";

import { Typography } from "neetoui";

import {
  renderSearchResult,
  removeTags,
  renderWithHighlightedTerms,
} from "./utils";

const Result = ({ onClick, title, body, searchTerm }) => (
  <div
    className="flex w-full cursor-pointer items-center justify-start border-t-2 bg-white px-6 py-3 hover:bg-gray-50"
    onClick={onClick}
  >
    <div className="flex flex-col">
      <Typography style="body1" weight="semibold">
        {renderWithHighlightedTerms({
          text: removeTags(title),
          term: searchTerm,
        })}
      </Typography>
      <Typography>
        {renderSearchResult({ source: removeTags(body), searchTerm })}
      </Typography>
    </div>
  </div>
);

export default Result;
