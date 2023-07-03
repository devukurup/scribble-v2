import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable, PageLoader } from "neetoui";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useUpdateArticles } from "hooks/useUpdateArticles";

import { DEFAULT_ACTIVE_STATUS } from "./constants";
import Empty from "./Empty";
import { columnData, setUrlParams } from "./utils";

const Table = ({
  setRowToBeDeleted,
  setIsDeleteAlertOpen,
  data,
  isLoading,
  refetch,
  totalCount,
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
  const { update } = useUpdateArticles();
  const history = useHistory();
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_NUMBER);
  const searchParams = new URLSearchParams(window.location.search);

  const handleDelete = row => {
    setIsDeleteAlertOpen(true);
    setRowToBeDeleted(row);
  };

  const handleUpdate = ({ id, publishStatus }) => {
    const payload = {
      status: publishStatus === "Publish" ? "published" : "draft",
    };
    update({ id, payload, onSuccess: refetch });
  };

  const handlePagination = (page, limit) => {
    const currentUrlParams = setUrlParams({
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
    urlStatus
      ? setActiveStatus(urlStatus)
      : setActiveStatus(DEFAULT_ACTIVE_STATUS);
    urlSearchTerm ? setSearchTerm(urlSearchTerm) : setSearchTerm("");
    setCurrentPageNumber(
      parseInt(searchParams.get("page") || DEFAULT_PAGE_NUMBER)
    );
    refetch(selectedCategories);
  }, [window.location.search]);

  useEffect(() => {
    const currentUrlParams = setUrlParams({
      page: DEFAULT_PAGE_NUMBER,
      limit: PAGINATION_LIMIT,
      search: debouncedSearchTerm,
      status: activeStatus,
    });
    history.push({ search: `?${currentUrlParams.toString()}` });
  }, [debouncedSearchTerm, activeStatus]);

  useEffect(() => {
    refetch(selectedCategories);
  }, [selectedCategories]);

  const filterColumns = () => {
    const availableColumnKeys = selectedColumns
      .filter(({ checked }) => checked)
      .map(column => column.key);

    return columnData({ handleDelete, handleUpdate }).filter(
      ({ key }) => key === "action" || availableColumnKeys.includes(key)
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

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
      loading={isLoading}
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
