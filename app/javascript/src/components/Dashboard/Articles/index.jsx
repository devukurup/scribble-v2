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

import { COLUMNS, STATUSES } from "./constants";
import ArticleDeleteAlert from "./DeleteAlert";
import MenuBar from "./MenuBar";
import SubHeader from "./SubHeader";
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
  const [selectedColumns, setSelectedColumns] = useState(COLUMNS);
  const [selectedArticleRowIds, setSelectedArticleRowIds] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const {
    data,
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
      } = await categoriesApi.list(categorySearchTerm.trim());
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
        <SubHeader
          refetchArticles={refetchArticles}
          searchTerm={searchTerm}
          selectedArticleRowIds={selectedArticleRowIds}
          selectedCategories={selectedCategories}
          selectedColumns={selectedColumns}
          setIsBulkDelete={setIsBulkDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setSelectedArticleRowIds={setSelectedArticleRowIds}
          setSelectedCategories={setSelectedCategories}
          setSelectedColumns={setSelectedColumns}
          totalCount={data?.filtered_articles_count}
        />
        <Table
          activeStatus={activeStatus}
          articles={data?.articles}
          debouncedSearchTerm={debouncedArticleSearchTerm}
          isLoading={isTableLoading}
          refetch={refetchArticles}
          selectedCategories={selectedCategories}
          selectedColumns={selectedColumns}
          selectedRowIds={selectedArticleRowIds}
          setActiveStatus={setActiveStatus}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setRowToBeDeleted={setRowToBeDeleted}
          setSearchTerm={setSearchTerm}
          setSelectedRowIds={setSelectedArticleRowIds}
          totalCount={data?.filtered_articles_count}
        />
      </div>
      <CreateCategory
        isOpen={isCreateModalOpen}
        refetch={fetchCategories}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ArticleDeleteAlert
        isBulkDelete={isBulkDelete}
        isOpen={isDeleteAlertOpen}
        refetch={refetchArticles}
        rowToBeDeleted={rowToBeDeleted}
        selectedArticleRowIds={selectedArticleRowIds}
        setIsBulkDelete={setIsBulkDelete}
        setIsOpen={setIsDeleteAlertOpen}
        setRowToBeDeleted={setRowToBeDeleted}
        setSelectedArticleRowIds={setSelectedArticleRowIds}
      />
    </>
  );
};

export default Articles;
