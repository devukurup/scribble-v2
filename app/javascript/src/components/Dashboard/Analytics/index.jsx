import React, { useState, useEffect } from "react";

import classnames from "classnames";
import { Table, PageLoader, Typography } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useFetchAnalytics } from "hooks/reactQuery/articles/useAnalyticsApi";

import { COLUMN_DATA, DEFAULT_SORT_OPTION, SORT_OPTIONS } from "./constants";
import { initializePageNumber } from "./utils";

import SidebarWrapper from "../SidebarWrapper";

const Analytics = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(
    initializePageNumber()
  );

  const [viewCountOrder, setViewCountOrder] = useState(DEFAULT_SORT_OPTION);

  const { t } = useTranslation();

  const history = useHistory();

  const { data: { articles, totalCount } = {}, isLoading } = useFetchAnalytics({
    params: {
      page: currentPageNumber,
      order: viewCountOrder,
    },
  });

  const buildPageSearchParam = page => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", page);

    return currentUrlParams;
  };

  useEffect(() => {
    const searchParams = buildPageSearchParam(currentPageNumber);
    history.push({ search: `?${searchParams.toString()}` });
  }, [currentPageNumber]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <SidebarWrapper>
      <Container>
        <Header title={t("common.analytics")} />
        <Typography className="mb-2" style="body2">
          {t("common.articleCount", { count: totalCount })}
        </Typography>
        <Table
          fixedHeight
          columnData={COLUMN_DATA}
          currentPageNumber={currentPageNumber}
          defaultPageSize={PAGINATION_LIMIT}
          handlePageChange={setCurrentPageNumber}
          rowData={articles}
          totalCount={totalCount}
          rowClassName={(_, index) =>
            classnames({ "neeto-ui-bg-gray-100": isEven(index) })
          }
          onChange={(_, __, { order }) =>
            setViewCountOrder(SORT_OPTIONS[order])
          }
        />
      </Container>
    </SidebarWrapper>
  );
};

export default Analytics;
