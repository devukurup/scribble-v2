import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { useUpdateArticles } from "hooks/useUpdateArticles";

import { columnData } from "./utils";

const Table = ({
  setRowToBeDeleted,
  setIsDeleteAlertOpen,
  articles,
  isLoading,
  refetch,
}) => {
  const { update } = useUpdateArticles();

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

  return (
    <NeetoUITable
      fixedHeight
      rowSelection
      columnData={columnData({ handleDelete, handleUpdate })}
      loading={isLoading}
      rowData={articles}
    />
  );
};

export default Table;
