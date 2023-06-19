import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { useFetchArticles } from "hooks/useFetchArticles";

import { COLUMN_DATA } from "./constants";

const Table = () => {
  const {
    data: { articles },
    isLoading,
  } = useFetchArticles();

  return (
    <NeetoUITable
      fixedHeight
      rowSelection
      columnData={COLUMN_DATA}
      loading={isLoading}
      rowData={articles}
      scroll={{ x: "100%" }}
      shouldDynamicallyRenderRowSize={false}
    />
  );
};

export default Table;
