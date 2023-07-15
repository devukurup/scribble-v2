import React from "react";

import { Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import { useFetchCategories } from "hooks/reactQuery/public/useCategoriesApi";
import { buildUrl } from "neetocommons/utils";

import Content from "./Content";
import Empty from "./Empty";
import Sidebar from "./Sidebar";

const Articles = () => {
  const { slug } = useParams();
  const history = useHistory();

  const handleSuccess = ({ categories }) => {
    if (!slug) {
      const firstArticleSlug = categories[0]["articles"][0]["slug"];
      history.push(
        buildUrl(routes.public.articles.show, { slug: firstArticleSlug })
      );
    }
  };

  const { data: { categories } = {}, isLoading } = useFetchCategories({
    onSuccess: handleSuccess,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isEmpty(categories)) return <Empty />;

  return (
    <div className="flex h-full flex-row">
      <Sidebar categories={categories} />
      <Content />
    </div>
  );
};

export default Articles;
