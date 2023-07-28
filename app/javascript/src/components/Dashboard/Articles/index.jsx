import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { Container, SubHeader } from "neetoui/layouts";
import { pluck } from "ramda";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";

import SidebarWrapper from "components/Dashboard/SidebarWrapper";
import CreateCategory from "Dashboard/Categories/Create";
import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";
import { nullSafe } from "neetocommons/pure";
import useArticlesStore from "stores/useArticlesStore";

import { Left, Right } from "./ActionBlocks";
import ArticleDeleteAlert from "./DeleteAlert";
import Header from "./Header";
import MenuBar from "./MenuBar";
import Table from "./Table";

const Articles = () => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rowToBeDeleted, setRowToBeDeleted] = useState({});
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get("page") || DEFAULT_PAGE_NUMBER;
  const limit = searchParams.get("limit") || PAGINATION_LIMIT;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const {
    filters,
    setIsDeleteAlertOpen,
    setSelectedArticleRowIds,
    setArticles,
  } = useArticlesStore.pick();

  const selectedCategoryIds = nullSafe(pluck)("id", filters.selectedCategories);

  const { isLoading, isFetching } = useFetchArticles({
    params: {
      page,
      limit,
      search,
      status: status.toLowerCase(),
      selectedCategoryIds,
    },
    options: {
      onSuccess: articles => {
        setArticles(articles);
      },
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
        isMenuBarOpen={isMenuBarOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <Container className="mx-4 w-full">
        <Header toggleMenubar={toggleMenubar} />
        <SubHeader
          leftActionBlock={<Left setIsBulkDelete={setIsBulkDelete} />}
          rightActionBlock={<Right />}
        />
        <Table isLoading={isFetching} setRowToBeDeleted={setRowToBeDeleted} />
      </Container>
      <CreateCategory
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <ArticleDeleteAlert
        isBulkDelete={isBulkDelete}
        rowToBeDeleted={rowToBeDeleted}
        onClose={handleClose}
      />
    </SidebarWrapper>
  );
};

export default Articles;
