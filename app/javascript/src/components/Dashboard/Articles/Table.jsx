import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useUpdateArticles } from "hooks/useUpdateArticles";

import { columnData } from "./utils";

const Table = ({
  setRowToBeDeleted,
  setIsDeleteAlertOpen,
  articles,
  isLoading,
  refetch,
  totalCount,
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

  const handlePagination = (page, size) => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", page);
    currentUrlParams.set("limit", size);
    history.push({ search: `?${currentUrlParams.toString()}` });
  };

  useEffect(() => {
    setCurrentPageNumber(
      parseInt(searchParams.get("page") || DEFAULT_PAGE_NUMBER)
    );
    refetch();
  }, [window.location.search]);

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
