import React from "react";

import classnames from "classnames";

import { truncate } from "neetocommons/pure";

import {
  TERM_PREFIX_TEXT_LENGTH,
  TERM_SUFFIX_TEXT_LENGTH,
  BODY_MAX_LENGTH,
  HTML_TAG_REGEX,
} from "./constants";

const reverseString = string => string.split("").reverse().join("");

export const removeTags = body => body.replace(HTML_TAG_REGEX, " ");

export const renderWithHighlightedTerms = ({ text, term }) => {
  const substrings = text.split(new RegExp(`(${term})`, "gi"));

  return (
    <span>
      {substrings.map((substring, index) => (
        <span
          key={index}
          className={classnames({
            "neeto-ui-bg-pastel-yellow":
              substring.toLowerCase() === term.toLowerCase(),
          })}
        >
          {substring}
        </span>
      ))}
    </span>
  );
};

export const renderSearchResult = ({ searchTerm, source }) => {
  const startIndex = source
    .toLowerCase()
    .indexOf(searchTerm.toLowerCase().trim());

  if (startIndex !== -1) {
    const endIndex = startIndex + searchTerm.length;
    const beforeTerm = reverseString(
      truncate(
        reverseString(source.substring(0, startIndex)),
        TERM_PREFIX_TEXT_LENGTH
      )
    );
    const searchedTerm = source.substring(startIndex, endIndex);
    const afterTerm = truncate(
      source.substring(endIndex),
      TERM_SUFFIX_TEXT_LENGTH
    );

    const searchResult = `${beforeTerm}${searchedTerm}${afterTerm}`;

    return renderWithHighlightedTerms({ text: searchResult, term: searchTerm });
  }

  return truncate(source, BODY_MAX_LENGTH);
};
