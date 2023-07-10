import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";

import SidebarWrapper from "components/Dashboard/SidebarWrapper";
import CreateCategory from "Dashboard/Categories/Create";
import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";
import useDebounce from "hooks/useDebounce";

import { COLUMNS, DEFAULT_ACTIVE_STATUS } from "./constants";
import ArticleDeleteAlert from "./DeleteAlert";
import Header from "./Header";
import MenuBar from "./MenuBar";
import SubHeader from "./SubHeader";
import Table from "./Table";

const Articles = () => {
  const [activeStatus, setActiveStatus] = useState(DEFAULT_ACTIVE_STATUS);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(COLUMNS);
  const [selectedArticleRowIds, setSelectedArticleRowIds] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const debouncedArticleSearchTerm = useDebounce(searchTerm);
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || DEFAULT_PAGE_NUMBER;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const selectedCategoryIds = selectedCategories?.map(({ id }) => id);

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
        activeStatus={activeStatus}
        articles={articles}
        isMenuBarOpen={isMenuBarOpen}
        selectedCategories={selectedCategories}
        setActiveStatus={setActiveStatus}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setSelectedCategories={setSelectedCategories}
      />
      <Container className="mx-4 w-full">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          status={activeStatus}
          toggleMenubar={toggleMenubar}
        />
        <SubHeader
          searchTerm={searchTerm}
          selectedArticleRowIds={selectedArticleRowIds}
          selectedCategories={selectedCategories}
          selectedColumns={selectedColumns}
          setIsBulkDelete={setIsBulkDelete}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setSelectedArticleRowIds={setSelectedArticleRowIds}
          setSelectedCategories={setSelectedCategories}
          setSelectedColumns={setSelectedColumns}
          totalCount={articles?.filteredArticlesCount}
        />
        <Table
          activeStatus={activeStatus}
          data={articles}
          debouncedSearchTerm={debouncedArticleSearchTerm}
          isLoading={isFetching}
          selectedCategories={selectedCategories}
          selectedColumns={selectedColumns}
          selectedRowIds={selectedArticleRowIds}
          setActiveStatus={setActiveStatus}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          setRowToBeDeleted={setRowToBeDeleted}
          setSearchTerm={setSearchTerm}
          setSelectedCategories={setSelectedCategories}
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
