import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import SidebarWrapper from "Dashboard/SidebarWrapper";
import {
  useShowArticle,
  useUpdateArticle,
} from "hooks/reactQuery/useArticlesApi";

import { STATUS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Form from "./Form";
import { formattedDateTime } from "./utils";

const Edit = () => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { articleId } = useParams();
  const history = useHistory();

  const { t } = useTranslation();

  const redirectToDashboard = () => {
    history.push(routes.articles.index);
  };

  const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle({
    onSuccess: redirectToDashboard,
  });

  const { data: { article } = {}, isLoading } = useShowArticle({
    id: articleId,
  });

  const handleSubmit = values => {
    const payload = {
      categoryId: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[values.status],
    };
    updateArticle({ id: articleId, payload });
  };

  const handleClose = () => {
    setIsDeleteAlertOpen(false);
    redirectToDashboard();
  };

  const handleDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <SidebarWrapper>
      <Form
        isEdit
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        dateString={formattedDateTime(
          article.status === t("statuses.published").toLowerCase()
            ? article?.lastPublishedAt
            : article?.updatedAt
        )}
        initialStatus={
          article.status === t("statuses.published").toLowerCase()
            ? t("statuses.publish")
            : t("statuses.saveDraft")
        }
        initialValues={{
          ...article,
          category: {
            label: article.category.title,
            value: article.category.id,
          },
        }}
        onClose={redirectToDashboard}
      />
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isUpdating}
        rowToBeDeleted={article}
        onClose={handleClose}
      />
    </SidebarWrapper>
  );
};

export default Edit;
