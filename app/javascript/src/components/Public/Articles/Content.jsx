import React from "react";
import { EditorContent } from "@bigbinary/neeto-editor";
import { Typography, PageLoader } from "neetoui";
import { useParams } from "react-router-dom";
import { useShowArticle } from "hooks/reactQuery/public/useArticlesApi";

const Content = () => {
  const { slug } = useParams();
  const { data, isLoading } = useShowArticle({ slug });

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <PageLoader />
      </div>
    );
  }

  const article = data.data.article;

  return (
    <div className="m-5 flex flex-col space-y-4 p-5 pl-96">
      <Typography style="h1">{article.title}</Typography>
      <EditorContent className="text-base" content={article.body} />
    </div>
  );
};

export default Content;
