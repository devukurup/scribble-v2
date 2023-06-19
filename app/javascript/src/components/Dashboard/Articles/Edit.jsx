import React from "react";

import { PageLoader } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import articlesApi from "apis/articles";
import { useShowArticle } from "hooks/useShowArticle";

import { STATUS } from "./constants";
import Form from "./Form";

const Edit = () => {
  const { articleId } = useParams();

  const { t } = useTranslation();

  const history = useHistory();

  const {
    data: { article },
    isLoading,
  } = useShowArticle(articleId);

  const handleSubmit = async values => {
    const payload = {
      category_id: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[values.status],
    };
    try {
      await articlesApi.update({ id: articleId, payload });
      history.push(routes.articles.index);
    } catch (error) {
      logger.error(error);
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      initialStatus={
        article.status === "published"
          ? t("articles.publish")
          : t("articles.saveDraft")
      }
      initialValues={{
        ...article,
        category: { label: article.category, value: article.category_id },
      }}
      onClose={() => history.push(routes.articles.index)}
    />
  );
};

export default Edit;
