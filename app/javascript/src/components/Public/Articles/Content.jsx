import React, { useEffect, useState } from "react";
import { EditorContent } from "@bigbinary/neeto-editor";
import { Typography, PageLoader } from "neetoui";
import { useParams } from "react-router-dom";
import articlesApi from "apis/public/articles";

const Content = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({});
  const { slug } = useParams();

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      const { data } = await articlesApi.show(slug);
      setArticle(data?.article);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="m-5 flex flex-col space-y-4 p-5">
      <Typography style="h1">{article.title}</Typography>
      <EditorContent className="text-base" content={article.body} />
    </div>
  );
};

export default Content;
