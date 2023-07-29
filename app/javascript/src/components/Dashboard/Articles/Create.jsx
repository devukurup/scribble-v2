import React from "react";

import { Container } from "neetoui/layouts";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import SidebarWrapper from "Dashboard/SidebarWrapper";
import { useCreateArticle } from "hooks/reactQuery/useArticlesApi";

import { INITIAL_VALUES } from "./constants";
import Form from "./Form";
import { STATUS_DROPDOWN_MENU } from "./Form/constants";

const Create = () => {
  const history = useHistory();

  const redirectToDashboard = () => history.push(routes.articles.index);

  const { mutate: createArticle, isLoading: isCreating } = useCreateArticle({
    onSuccess: redirectToDashboard,
  });

  const handleSubmit = async values => {
    const payload = {
      categoryId: values.category.value,
      title: values.title,
      body: values.body,
      status: values.status.value,
    };
    createArticle(payload);
  };

  return (
    <SidebarWrapper>
      <Container>
        <Form
          handleSubmit={handleSubmit}
          initialStatus={STATUS_DROPDOWN_MENU[0]}
          initialValues={INITIAL_VALUES}
          isSubmitting={isCreating}
          onClose={redirectToDashboard}
        />
      </Container>
    </SidebarWrapper>
  );
};

export default Create;
