import React from "react";
import { truncate } from "neetocommons/pure";
const reverse = string => string.split("").reverse().join("");

export const renderHighlightedText = (text, term) => {
  const startIndex = text.toLowerCase().indexOf(term.trim().toLowerCase());
  if (startIndex !== -1) {
    const endIndex = startIndex + term.length;
    const beforeTerm = text.substring(startIndex - 20, startIndex);
    const highlightedTerm = text.substring(startIndex, endIndex);
    const afterTerm = text.substring(endIndex);
    const truncatedBeforeTerm = reverse(truncate(reverse(beforeTerm), 10));

    return (
      <p>
        <span>{truncatedBeforeTerm}</span>
        <span className="neeto-ui-bg-pastel-yellow">{highlightedTerm}</span>
        <span>{truncate(afterTerm, 30)}</span>
      </p>
    );
  }
  return text;
};
