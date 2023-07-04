import React from "react";
import Sidebar from "./Sidebar";
import { PageLoader } from "neetoui";
import { useParams, useHistory } from "react-router-dom";
import Content from "./Content";
import { isEmpty } from "ramda";
import Empty from "./Empty";
import { buildUrl } from "neetocommons/utils";
import routes from "src/routes";
import { useFetchCategories } from "hooks/reactQuery/public/useCategoriesApi";

const Articles = () => {
  const { slug } = useParams();
  const history = useHistory();

  const handleSuccess = data => {
    if (!slug) {
      const firstArticleSlug = data.data.categories[0]["articles"][0]["slug"];
      history.push(
        buildUrl(routes.public.articles.show, { slug: firstArticleSlug })
      );
    }
  };

  const { data, isLoading } = useFetchCategories({ onSuccess: handleSuccess });
  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center">
        <PageLoader />
      </div>
    );
  }

  const categories = data.data.categories;

  if (isEmpty(categories)) {
    return <Empty />;
  }

  return (
    <div className="flex flex-row">
      <Sidebar categories={categories} />
      {slug && <Content />}
    </div>
  );
};

export default Articles;
