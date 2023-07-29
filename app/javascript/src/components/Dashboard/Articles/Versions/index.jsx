import React from "react";

import { Pane, Spinner, Typography, Tag } from "neetoui";
import { useTranslation } from "react-i18next";

import { useFetchVersions } from "hooks/reactQuery/articles/useVersionsApi";

import Header from "./Header";
import Item from "./Item";

import { DRAFT_STATUS } from "../constants";

const Versions = ({
  isOpen,
  onClose,
  title,
  articleId,
  handleRestore,
  currentStatus,
}) => {
  const { t } = useTranslation();
  const { data: { versions } = {}, isLoading } = useFetchVersions({
    articleId,
  });

  return (
    <Pane isOpen={isOpen} onClose={onClose}>
      <Pane.Header>
        <Header title={title} />
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="neeto-ui-bg-gray-100 sticky top-0 my-2 flex w-full items-center justify-between p-3">
              <Typography style="h4" weight="semibold">
                {t("articles.versions.event", {
                  event:
                    currentStatus === DRAFT_STATUS
                      ? t("articles.versions.draft")
                      : currentStatus,
                })}
              </Typography>
              <Tag
                label={t("articles.versions.current")}
                size="large"
                style="success"
              />
            </div>
            {versions.map((version, index) => (
              <Item
                handleRestore={handleRestore}
                isCreated={index === versions.length - 1}
                key={version.id}
                version={version}
              />
            ))}
          </>
        )}
      </Pane.Body>
    </Pane>
  );
};

export default Versions;
