import React, { useEffect, useState } from "react";
import categoriesApi from "apis/public/categories";
import { Spinner, Typography } from "neetoui";
import Item from "./Item";
import { DEFAULT_ACTIVE_INDEX } from "./constants";
import { Down, Right } from "neetoicons";
import { isCategoryActive } from "./utils";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState([DEFAULT_ACTIVE_INDEX]);

  const { slug } = useParams();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await categoriesApi.list();
      setCategories(data?.categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActiveIndexes = index => {
    activeIndexes.includes(index)
      ? setActiveIndexes(activeIndexes =>
          activeIndexes.filter(activeIndex => activeIndex !== index)
        )
      : setActiveIndexes(activeIndexes => [...activeIndexes, index]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="scribble-sidebar flex flex-shrink-0 flex-col overflow-y-auto overflow-x-hidden p-2">
      {categories.map(({ title, id, articles }, index) => (
        <div key={id} className="flex flex-col space-y-2 p-3">
          <div
            key={id}
            onClick={() => handleActiveIndexes(index)}
            className="flex cursor-pointer items-center space-x-2"
          >
            {isCategoryActive({ articles, slug, activeIndexes, index }) ? (
              <Down />
            ) : (
              <Right />
            )}
            <Typography style="h4">{title}</Typography>
          </div>
          {isCategoryActive({ articles, slug, activeIndexes, index }) && (
            <div className="ml-8 flex flex-col space-y-1">
              {articles.map(({ title, slug }) => (
                <Item key={slug} title={title} slug={slug} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
