import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useUpdateArticle } from "hooks/reactQuery/useArticlesApi";

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
  data,
  totalCount,
  isLoading,
  debouncedSearchTerm,
  activeStatus,
  setActiveStatus,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedColumns,
  selectedRowIds,
  setSelectedRowIds,
}) => {
  const history = useHistory();
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_NUMBER);
  const searchParams = new URLSearchParams(window.location.search);

  const handleDelete = row => {
    setIsDeleteAlertOpen(true);
    setRowToBeDeleted(row);
  };

  const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle();

  const handleUpdate = ({ id, publishStatus }) => {
    const payload = {
      status: publishStatus === "Publish" ? "published" : "draft",
    };
    updateArticle({ id, payload });
  };

  const handlePagination = (page, limit) => {
    const currentUrlParams = buildUrlParams({
      page,
      limit,
      search: debouncedSearchTerm,
      status: activeStatus,
    });
    history.push({ search: `?${currentUrlParams.toString()}` });
  };

  useEffect(() => {
    const urlStatus = searchParams.get("status");
    const urlSearchTerm = searchParams.get("search");
    setActiveStatus(ARTICLE_STATUSES[urlStatus] ?? DEFAULT_ACTIVE_STATUS);
    urlSearchTerm ? setSearchTerm(urlSearchTerm) : setSearchTerm("");
    setCurrentPageNumber(
      parseInt(searchParams.get("page") || DEFAULT_PAGE_NUMBER)
    );
  }, []);

  useEffect(() => {
    const currentUrlParams = buildUrlParams({
      page: DEFAULT_PAGE_NUMBER,
      limit: PAGINATION_LIMIT,
      search: debouncedSearchTerm,
      status: activeStatus,
    });

    history.push({ search: `?${currentUrlParams.toString()}` });
  }, [debouncedSearchTerm, activeStatus]);

  const filterColumns = () => {
    const availableColumnKeys = selectedColumns
      .filter(({ checked }) => checked)
      .map(column => column.key);

    return columnData({ handleDelete, handleUpdate }).filter(
      ({ key }) => key === ACTION_KEY || availableColumnKeys.includes(key)
    );
  };

  if (data?.filtered_articles_count === 0) {
    return (
      <Empty
        activeStatus={activeStatus}
        search={debouncedSearchTerm}
        selectedCategories={selectedCategories}
        setActiveStatus={setActiveStatus}
        setSearch={setSearchTerm}
        setSelectedCategories={setSelectedCategories}
        totalCount={data?.all_articles_count}
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
      rowData={data?.articles}
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
