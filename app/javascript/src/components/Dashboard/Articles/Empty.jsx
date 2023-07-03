import React from "react";

import { NoData } from "neetoui";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import EmptyImage from "images/Empty";

import { getEmptyArticleProps } from "./utils";

const Empty = ({
  activeStatus,
  search,
  selectedCategories,
  setActiveStatus,
  setSearch,
  setSelectedCategories,
  totalCount,
}) => {
  const history = useHistory();

  const redirectToNewArticle = () => {
    history.push(routes.articles.new);
  };

  const { title, description, label, onClick } = getEmptyArticleProps({
    activeStatus,
    search,
    selectedCategories,
    setActiveStatus,
    setSearch,
    setSelectedCategories,
    totalCount,
    redirectToNewArticle,
  });

  return (
    <div className="mt-48 flex w-full items-center justify-center">
      <NoData
        description={description}
        image={<EmptyImage />}
        title={title}
        primaryButtonProps={{
          label,
          onClick,
        }}
      />
    </div>
  );
};

export default Empty;
