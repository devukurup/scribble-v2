import React, { useState } from "react";

import { Alert, Spinner } from "@bigbinary/neetoui";
import { t } from "i18next";
import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import {
  useCreateRedirection,
  useDeleteRedirection,
  useFetchRedirections,
  useUpdateRedirection,
} from "src/hooks/reactQuery/useRedirectionsApi";

import Form from "./Form";
import Header from "./Header";
import Redirection from "./Redirection";

import { FORM_INITIAL_VALUES, NEW_REDIRECTION } from "../constants";

const Table = () => {
  const [selectedRedirection, setSelectedRedirection] = useState({});
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data, isLoading } = useFetchRedirections();

  const handleDeleteClick = redirection => {
    setIsDeleteAlertOpen(true);
    setSelectedRedirection(redirection);
  };

  const { mutate: createRedirection, isLoading: isCreating } =
    useCreateRedirection();

  const { mutate: updateRedirection, isLoading: isUpdating } =
    useUpdateRedirection({
      options: { onSuccess: () => setSelectedRedirection({}) },
    });

  const { mutate: deleteRedirection, isLoading: isDeleting } =
    useDeleteRedirection({
      options: {
        onSuccess: () => {
          setIsDeleteAlertOpen(false);
          setSelectedRedirection({});
        },
      },
    });

  const handleUpdate = payload =>
    updateRedirection({ id: selectedRedirection.id, payload });

  if (isLoading || isUpdating || isCreating) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  const redirections = data.data.redirections;

  return (
    <div className="flex w-full flex-col items-start space-y-3 bg-blue-50 p-5">
      <div className="w-full">
        <Header />
        {redirections.map(redirection => (
          <Redirection
            disableOptions={isEmpty(selectedRedirection?.id)}
            isEdit={selectedRedirection?.id === redirection.id}
            key={redirection.id}
            redirection={redirection}
            setSelectedRedirection={setSelectedRedirection}
            onDeleteClick={handleDeleteClick}
            onUpdateSubmit={handleUpdate}
          />
        ))}
        {isEmpty(selectedRedirection?.id) && (
          <Form
            initialValues={FORM_INITIAL_VALUES}
            onClose={() => setSelectedRedirection({})}
            onSubmit={createRedirection}
          />
        )}
      </div>
      <Button
        icon={Plus}
        iconPosition="left"
        label="Add new redirection"
        style="link"
        disabled={
          isEmpty(selectedRedirection?.id) || !isEmpty(selectedRedirection)
        }
        onClick={() => setSelectedRedirection(NEW_REDIRECTION)}
      />
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        title={t("redirection.delete.title")}
        message={t("redirection.delete.message", {
          from: selectedRedirection.from,
          to: selectedRedirection.to,
        })}
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => deleteRedirection(selectedRedirection.id)}
      />
    </div>
  );
};

export default Table;
