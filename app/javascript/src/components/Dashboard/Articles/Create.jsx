import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import SidebarWrapper from "Dashboard/SidebarWrapper";
import { useCreateArticle } from "hooks/reactQuery/useArticlesApi";

import { INITIAL_VALUES, STATUS } from "./constants";
import Form from "./Form";

const Create = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const redirectToDashboard = () => history.push(routes.articles.index);

  const { mutate: createArticle, isLoading: isCreating } = useCreateArticle({
    onSuccess: redirectToDashboard,
  });

  const handleSubmit = async values => {
    const payload = {
      categoryId: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[values.status],
    };
    createArticle(payload);
  };

  return (
    <SidebarWrapper>
      <Form
        handleSubmit={handleSubmit}
        initialStatus={t("statuses.publish")}
        initialValues={INITIAL_VALUES}
        isSubmitting={isCreating}
        onClose={redirectToDashboard}
      />
    </SidebarWrapper>
  );
};

export default Create;
