import { Typography } from "neetoui";
import React from "react";
import { renderHighlightedText } from "./utils";

const Result = ({ onClick, title, body, searchTerm }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-start border-t-2 bg-white px-6 py-3 hover:bg-gray-50"
    >
      <div className="flex flex-col">
        <Typography style="body1" weight="semibold">
          {renderHighlightedText(title, searchTerm)}
        </Typography>
        <Typography>{renderHighlightedText(body, searchTerm)}</Typography>
      </div>
    </div>
  );
};

export default Result;
