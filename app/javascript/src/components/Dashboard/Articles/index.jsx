import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";

import SidebarWrapper from "components/Dashboard/SidebarWrapper";
import CreateCategory from "Dashboard/Categories/Create";
import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";

import { COLUMNS, INITIAL_FILTERS } from "./constants";
import ArticleDeleteAlert from "./DeleteAlert";
import Header from "./Header";
import MenuBar from "./MenuBar";
import SubHeader from "./SubHeader";
import Table from "./Table";

const Articles = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState({});
  const [selectedColumns, setSelectedColumns] = useState(COLUMNS);
  const [selectedArticleRowIds, setSelectedArticleRowIds] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || DEFAULT_PAGE_NUMBER;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const selectedCategoryIds = filters.selectedCategories?.map(({ id }) => id);

  const setEachFilters = newFilters =>
    setFilters({ ...filters, ...newFilters });

  const {
    data: articles,
    isLoading,
    isFetching,
  } = useFetchArticles({
    params: {
      page,
      limit,
      search,
      status: status.toLowerCase(),
      selectedCategoryIds,
    },
  });

  const handleClose = () => {
    setIsDeleteAlertOpen(false);
    if (isBulkDelete) {
      setIsBulkDelete(false);
      setSelectedArticleRowIds([]);
    } else {
      setRowToBeDeleted({});
    }
  };

  const toggleMenubar = () => setIsMenuBarOpen(isMenuBarOpen => !isMenuBarOpen);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <SidebarWrapper>
      <MenuBar
        articles={articles}
        filters={filters}
        isMenuBarOpen={isMenuBarOpen}
        setFilters={setEachFilters}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <Container className="mx-4 w-full">
        <Header
          filters={filters}
          setFilters={setEachFilters}
          toggleMenubar={toggleMenubar}
        />
        <SubHeader
          filters={filters}
          selectedArticleRowIds={selectedArticleRowIds}
          selectedColumns={selectedColumns}
          setFilters={setEachFilters}
          setIsBulkDelete={setIsBulkDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setSelectedArticleRowIds={setSelectedArticleRowIds}
          setSelectedColumns={setSelectedColumns}
          totalCount={articles?.filteredArticlesCount}
        />
        <Table
          articles={articles}
          filters={filters}
          isLoading={isFetching}
          selectedColumns={selectedColumns}
          selectedRowIds={selectedArticleRowIds}
          setFilters={setEachFilters}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setRowToBeDeleted={setRowToBeDeleted}
          setSelectedRowIds={setSelectedArticleRowIds}
          totalCount={articles?.filteredArticlesCount}
        />
      </Container>
      <CreateCategory
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ArticleDeleteAlert
        isBulkDelete={isBulkDelete}
        isOpen={isDeleteAlertOpen}
        rowToBeDeleted={rowToBeDeleted}
        selectedArticleRowIds={selectedArticleRowIds}
        onClose={handleClose}
      />
    </SidebarWrapper>
  );
};

export default Articles;
