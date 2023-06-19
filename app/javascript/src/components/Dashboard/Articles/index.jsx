import React, { useState } from "react";

import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import categoriesApi from "apis/categories";
import CreateCategory from "Dashboard/Categories/Create";
import useDebounce from "hooks/useDebounce";

import { STATUSES } from "./constants";
import MenuBar from "./MenuBar";
import Table from "./Table";

const Articles = () => {
  const [activeStatus, setActiveStatus] = useState(STATUSES[0].label);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm);

  const history = useHistory();

  const { t } = useTranslation();

  const fetchCategories = async () => {
    try {
      setIsCategoriesLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list({ searchTerm: categorySearchTerm.trim() });
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  return (
    <>
      <MenuBar
        activeStatus={activeStatus}
        categories={categories}
        debouncedSearchTerm={debouncedCategorySearchTerm}
        fetchCategories={fetchCategories}
        isCategoriesLoading={isCategoriesLoading}
        isMenuBarOpen={isMenuBarOpen}
        searchTerm={categorySearchTerm}
        setActiveStatus={setActiveStatus}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setSearchTerm={setCategorySearchTerm}
      />
      <div className="mx-4 w-full">
        <Header
          title={t("header.articles.title", { status: activeStatus })}
          actionBlock={
            <Button
              label={t("header.articles.buttonLabel")}
              size="small"
              onClick={() => history.push(routes.articles.new)}
            />
          }
          menuBarToggle={() =>
            setIsMenuBarOpen(isMenuBarOpen => !isMenuBarOpen)
          }
          searchProps={{
            value: searchTerm,
            onChange: event => setSearchTerm(event.target.value),
            placeholder: t("header.articles.placeholder"),
          }}
        />
        <Table />
      </div>
      <CreateCategory
        isOpen={isCreateModalOpen}
        refetch={fetchCategories}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Articles;
