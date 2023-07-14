import React from "react";

import { EditorContent } from "neetoeditor";
import { Typography, Spinner } from "neetoui";

import Scrollable from "neetomolecules/Scrollable";

import LabelWrapper from "./LabelWrapper";

const Content = ({ version, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <LabelWrapper title="Category">
        <Typography className="w-full border p-2" style="body1">
          {version.category}
        </Typography>
      </LabelWrapper>
      <LabelWrapper title="Title">
        <Typography className="w-full border p-2" style="body1">
          {version.title}
        </Typography>
      </LabelWrapper>
      <LabelWrapper title="Description">
        <Scrollable className="flex h-96 w-full flex-col space-y-4 border py-3 px-2">
          <EditorContent className="text-base" content={version.body} />
        </Scrollable>
      </LabelWrapper>
    </div>
  );
};

export default Content;
