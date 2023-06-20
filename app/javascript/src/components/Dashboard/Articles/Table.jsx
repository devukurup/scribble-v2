import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useUpdateArticles } from "hooks/useUpdateArticles";

import { STATUSES } from "./constants";
import { columnData, setUrlParams } from "./utils";

const Table = ({
  setRowToBeDeleted,
  setIsDeleteAlertOpen,
  articles,
  isLoading,
  refetch,
  totalCount,
  debouncedSearchTerm,
  activeStatus,
  setActiveStatus,
  setSearchTerm,
}) => {
  const { update } = useUpdateArticles();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
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
    urlStatus ? setActiveStatus(urlStatus) : setActiveStatus(STATUSES[0].label);
    urlSearchTerm ? setSearchTerm(urlSearchTerm) : setSearchTerm("");
    setCurrentPageNumber(
      parseInt(searchParams.get("page") || DEFAULT_PAGE_NUMBER)
    );
    refetch();
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

  return (
    <NeetoUITable
      fixedHeight
      rowSelection
      columnData={columnData({ handleDelete, handleUpdate })}
      currentPageNumber={currentPageNumber}
      defaultPageSize={PAGINATION_LIMIT}
      handlePageChange={handlePagination}
      loading={isLoading}
      rowData={articles}
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
