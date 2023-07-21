import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useUpdateArticle } from "hooks/reactQuery/useArticlesApi";
import useDebounce from "hooks/useDebounce";

import {
  ACTION_KEY,
  DEFAULT_ACTIVE_STATUS,
  ARTICLE_STATUSES,
} from "./constants";
import Empty from "./Empty";
import { columnData, buildUrlParams } from "./utils";

const Table = ({
  setRowToBeDeleted,
  setIsDeleteAlertOpen,
  articles,
  totalCount,
  isLoading,
  filters,
  setFilters,
  selectedColumns,
  selectedRowIds,
  setSelectedRowIds,
}) => {
  const history = useHistory();
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_NUMBER);
  const searchParams = new URLSearchParams(window.location.search);

  const { searchTerm, selectedCategories, activeStatus } = filters;

  const debouncedSearchTerm = useDebounce(searchTerm);

  const handleDelete = row => {
    setIsDeleteAlertOpen(true);
    setRowToBeDeleted(row);
  };

  const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle();

  const handleUpdate = ({ id, publishStatus }) => {
    const payload = {
      status:
        publishStatus === "Publish"
          ? ARTICLE_STATUSES.published
          : ARTICLE_STATUSES.draft,
    };
    updateArticle({ id, payload });
  };

  const handlePagination = (page, limit) => {
    const currentUrlParams = buildUrlParams({
      page,
      limit,
      search: debouncedSearchTerm.trim(),
      status: activeStatus,
    });
    history.push({ search: `?${currentUrlParams.toString()}` });
    setCurrentPageNumber(page);
  };

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlSearchTerm = searchParams.get("search");
    setFilters({
      activeStatus: ARTICLE_STATUSES[urlStatus] ?? DEFAULT_ACTIVE_STATUS,
      searchTerm: urlSearchTerm ?? "",
    });

    setCurrentPageNumber(
      parseInt(searchParams.get("page") || DEFAULT_PAGE_NUMBER)
    );
  }, []);

  useEffect(() => {
    const currentUrlParams = buildUrlParams({
      page: DEFAULT_PAGE_NUMBER,
      limit: PAGINATION_LIMIT,
      search: debouncedSearchTerm.trim(),
      status: activeStatus,
    });
    setCurrentPageNumber(DEFAULT_PAGE_NUMBER);
    history.push({ search: `?${currentUrlParams.toString()}` });
  }, [debouncedSearchTerm, activeStatus, selectedCategories]);

  const filterColumns = () => {
    const availableColumnKeys = selectedColumns
      .filter(({ checked }) => checked)
      .map(column => column.key);

    return columnData({ handleDelete, handleUpdate }).filter(
      ({ key }) => key === ACTION_KEY || availableColumnKeys.includes(key)
    );
  };

  if (articles?.filteredArticlesCount === 0) {
    return (
      <Empty
        filters={filters}
        search={debouncedSearchTerm}
        setFilters={setFilters}
        totalCount={articles?.allArticlesCount}
      />
    );
  }

  return (
    <NeetoUITable
      fixedHeight
      rowSelection
      columnData={filterColumns()}
      currentPageNumber={currentPageNumber}
      defaultPageSize={PAGINATION_LIMIT}
      handlePageChange={handlePagination}
      loading={isUpdating || isLoading}
      rowData={articles?.articles}
      selectedRowKeys={selectedRowIds}
      totalCount={totalCount}
      rowClassName={(_, index) =>
        classnames({ "neeto-ui-bg-gray-100": isEven(index) })
      }
      onRowSelect={setSelectedRowIds}
    />
  );
};

export default Table;
