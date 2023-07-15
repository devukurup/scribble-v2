import React from "react";

import classnames from "classnames";
import { Typography } from "neetoui";

import { isNotEmpty, truncate } from "neetocommons/pure";

import { TERM_PREFIX_TEXT_LENGTH } from "./constants";

const reverse = string => string.split("").reverse().join("");

const getIndices = ({ searchTerm, source }) =>
  [...source.trim().matchAll(new RegExp(searchTerm.trim(), "gi"))].map(
    a => a.index
  );

export const renderHighlightedTerms = (searchResult, searchTerm) => {
  const substrings = searchResult.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {substrings.map((substring, index) => (
        <span
          key={index}
          className={classnames({
            "neeto-ui-bg-pastel-yellow":
              substring.toLowerCase() === searchTerm.toLowerCase(),
          })}
        >
          {substring}
        </span>
      ))}
    </span>
  );
};

export const renderSearchResult = ({ searchTerm, source, index }) => {
  const endIndex = index + searchTerm.length;
  const beforeTerm = reverse(
    truncate(reverse(source.substring(0, index)), TERM_PREFIX_TEXT_LENGTH)
  );
  const highlightedTerm = source.substring(index, endIndex);
  const afterTerm = truncate(
    source.substring(endIndex),
    TERM_PREFIX_TEXT_LENGTH
  );

  const searchResult = `${beforeTerm}${highlightedTerm}${afterTerm}`;

  return (
    <Typography>{renderHighlightedTerms(searchResult, searchTerm)}</Typography>
  );
};

export const renderMatchingLines = ({ source, searchTerm }) => {
  const matchingIndices = getIndices({
    searchTerm,
    source,
  }).slice(0, 4);

  if (isNotEmpty(matchingIndices)) {
    return matchingIndices.map(index =>
      renderSearchResult({ searchTerm, source, index })
    );
  }

  return source;
};
