import React, { useState, useEffect } from "react";

import classnames from "classnames";
import { Download } from "neetoicons";
import { Table, PageLoader, Typography, Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PAGINATION_LIMIT } from "src/constants";
import { isEven } from "src/utils";

import { useFetchAnalytics } from "hooks/reactQuery/articles/useAnalyticsApi";

import { COLUMN_DATA, DEFAULT_SORT_OPTION, SORT_OPTIONS } from "./constants";
import DownloadModal from "./DownloadModal";
import { buildPageSearchParam, initializePageNumber } from "./utils";

import SidebarWrapper from "../SidebarWrapper";

const Analytics = () => {
  const [currentPageNumber, setCurrentPageNumber] =
    useState(initializePageNumber);
  const [viewCountOrder, setViewCountOrder] = useState(DEFAULT_SORT_OPTION);
  const [isDownloadPaneOpen, setIsDownloadPaneOpen] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  const { data: { articles, totalCount } = {}, isLoading } = useFetchAnalytics({
    params: {
      page: currentPageNumber,
      order: viewCountOrder,
    },
  });

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
        <div className="mb-5 flex w-full items-center justify-between">
          <Typography style="body2">
            {t("common.articleCount", { count: totalCount })}
          </Typography>
          <Button
            icon={Download}
            label={t("common.download")}
            size="small"
            onClick={() => setIsDownloadPaneOpen(true)}
          />
        </div>
        <Table
          fixedHeight
          columnData={COLUMN_DATA}
          currentPageNumber={currentPageNumber}
          defaultPageSize={PAGINATION_LIMIT}
          handlePageChange={setCurrentPageNumber}
          rowData={articles}
          rowKey="slug"
          totalCount={totalCount}
          rowClassName={(_, index) =>
            classnames({ "neeto-ui-bg-gray-100": isEven(index) })
          }
          onChange={(_, __, { order }) =>
            setViewCountOrder(SORT_OPTIONS[order])
          }
        />
        <DownloadModal
          isOpen={isDownloadPaneOpen}
          onClose={() => setIsDownloadPaneOpen(false)}
        />
      </Container>
    </SidebarWrapper>
  );
};

export default Analytics;
