import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import articlesApi from "apis/articles";

import { INITIAL_VALUES, STATUS } from "./constants";
import Form from "./Form";

import SidebarWrapper from "../SidebarWrapper";

const Create = () => {
  const history = useHistory();

  const { t } = useTranslation();

  const handleSubmit = async values => {
    const payload = {
      category_id: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[values.status],
    };
    try {
      await articlesApi.create(payload);
      history.push(routes.articles.index);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <SidebarWrapper>
      <Form
        handleSubmit={handleSubmit}
        initialStatus={t("statuses.publish")}
        initialValues={INITIAL_VALUES}
        onClose={() => history.push(routes.articles.index)}
      />
    </SidebarWrapper>
  );
};

export default Create;
