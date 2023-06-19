import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import routes from "src/routes";

import articlesApi from "apis/articles";

import { INITIAL_VALUES, STATUS } from "./constants";
import Form from "./Form";

const Create = () => {
  const [status, setStatus] = useState("Publish");

  const history = useHistory();

  const handleSubmit = async values => {
    const payload = {
      category_id: values.category.value,
      title: values.title,
      body: values.body,
      status: STATUS[status],
    };
    try {
      await articlesApi.create(payload);
      history.push(routes.articles.index);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
      setStatus={setStatus}
      status={status}
      onClose={() => history.push(routes.articles.index)}
    />
  );
};

export default Create;
