import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { PageLoader } from "neetoui";
import categoriesApi from "apis/public/categories";
import { useParams, useHistory } from "react-router-dom";
import Content from "./Content";
import { isEmpty } from "ramda";
import Empty from "./Empty";

const Articles = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      if (!slug) {
        const firstArticleSlug = categories[0]["articles"][0]["slug"];
        history.push(`/public/articles/${firstArticleSlug}`);
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <PageLoader />
      </div>
    );
  }

  if (isEmpty(categories)) {
    return <Empty />;
  }

  return (
    <div className="flex">
      <Sidebar categories={categories} />
      {slug && <Content />}
    </div>
  );
};

export default Articles;
