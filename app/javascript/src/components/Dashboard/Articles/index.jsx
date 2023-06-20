import React, { useState } from "react";

import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import categoriesApi from "apis/categories";
import CreateCategory from "Dashboard/Categories/Create";
import useDebounce from "hooks/useDebounce";
import { useFetchArticles } from "hooks/useFetchArticles";

import { STATUSES } from "./constants";
import ArticleDeleteAlert from "./DeleteAlert";
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
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState({});
  const debouncedArticleSearchTerm = useDebounce(searchTerm);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    data: { articles, filtered_articles_count: totalCount },
    isLoading: isTableLoading,
    refetch: refetchArticles,
  } = useFetchArticles();

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
        selectedCategories={selectedCategories}
        setActiveStatus={setActiveStatus}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setSearchTerm={setCategorySearchTerm}
        setSelectedCategories={setSelectedCategories}
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
        <Table
          activeStatus={activeStatus}
          articles={articles}
          debouncedSearchTerm={debouncedArticleSearchTerm}
          isLoading={isTableLoading}
          refetch={refetchArticles}
          selectedCategories={selectedCategories}
          setActiveStatus={setActiveStatus}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setRowToBeDeleted={setRowToBeDeleted}
          setSearchTerm={setSearchTerm}
          totalCount={totalCount}
        />
      </div>
      <CreateCategory
        isOpen={isCreateModalOpen}
        refetch={fetchCategories}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ArticleDeleteAlert
        isOpen={isDeleteAlertOpen}
        refetch={refetchArticles}
        rowToBeDeleted={rowToBeDeleted}
        setIsOpen={setIsDeleteAlertOpen}
        setRowToBeDeleted={setRowToBeDeleted}
      />
    </>
  );
};

export default Articles;
