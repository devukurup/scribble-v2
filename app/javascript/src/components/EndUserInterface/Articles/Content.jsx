import React from "react";

import { EditorContent } from "neetoeditor";
import { Typography, Spinner } from "neetoui";
import { useParams } from "react-router-dom";

import { useShowArticle } from "hooks/reactQuery/public/useArticlesApi";
import Scrollable from "neetomolecules/Scrollable";

const Content = () => {
  const { slug } = useParams();
  const { data: { article } = {}, isLoading } = useShowArticle({ slug });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Scrollable className="flex w-full flex-col space-y-4 p-10">
      <Typography style="h1">{article?.title}</Typography>
      <EditorContent className="text-base" content={article?.body} />
    </Scrollable>
  );
};

export default Content;
