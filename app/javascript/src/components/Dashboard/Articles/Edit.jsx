import React, { useState } from "react";

import { PageLoader } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import { useShowArticle } from "hooks/useShowArticle";
import { useUpdateArticles } from "hooks/useUpdateArticles";

import { STATUS } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Form from "./Form";
import { formattedDateTime } from "./utils";

import SidebarWrapper from "../SidebarWrapper";

const Edit = () => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { articleId } = useParams();

  const { t } = useTranslation();

  const history = useHistory();

  const { update } = useUpdateArticles();

  const {
    data: { article },
    isLoading,
  } = useShowArticle(articleId);

  const handleSubmit = values => {
    const payload = {
      category_id: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[values.status],
    };
    update({ id: articleId, payload });
    redirectToDashboard();
  };

  const handleDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  const redirectToDashboard = () => {
    history.push(routes.articles.index);
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
          article.status === "published"
            ? article?.last_published_at
            : article?.updated_at
        )}
        initialStatus={
          article.status === "published"
            ? t("articles.publish")
            : t("articles.saveDraft")
        }
        initialValues={{
          ...article,
          category: { label: article.category, value: article.category_id },
        }}
        onClose={redirectToDashboard}
      />
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        refetch={redirectToDashboard}
        rowToBeDeleted={article}
        onClose={() => setIsDeleteAlertOpen(false)}
      />
    </SidebarWrapper>
  );
};

export default Edit;
