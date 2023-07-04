import React, { useState } from "react";

import { Alert, Spinner } from "@bigbinary/neetoui";
import { t } from "i18next";
import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";
import {
  useCreateRedirection,
  useDeleteRedirection,
  useFetchRedirections,
} from "src/hooks/reactQuery/useRedirectionsApi";

import Form from "./Form";
import Header from "./Header";
import Redirection from "./Redirection";

import {
  DEFAULT_SELECTED_REDIRECTION,
  FORM_INITIAL_VALUES,
  NEW_REDIRECTION,
} from "../constants";

const Table = () => {
  const [selectedRedirection, setSelectedRedirection] = useState({});
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data, isLoading } = useFetchRedirections();

  const handleDeleteClick = redirection => {
    setIsDeleteAlertOpen(true);
    setSelectedRedirection(redirection);
  };

  const resetSelectedRedirection = () =>
    setSelectedRedirection(DEFAULT_SELECTED_REDIRECTION);

  const { mutate: createRedirection, isLoading: isCreating } =
    useCreateRedirection({ onSuccess: resetSelectedRedirection });

  const { mutate: deleteRedirection, isLoading: isDeleting } =
    useDeleteRedirection({
      onSuccess: () => {
        handleClose();
      },
    });

  const handleClose = () => {
    setIsDeleteAlertOpen(false);
    resetSelectedRedirection();
  };

  if (isLoading || isCreating) {
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
          />
        ))}
        {isEmpty(selectedRedirection?.id) && (
          <Form
            initialValues={FORM_INITIAL_VALUES}
            onClose={resetSelectedRedirection}
            onSubmit={createRedirection}
          />
        )}
      </div>
      <Button
        icon={Plus}
        iconPosition="left"
        label={t("settings.redirections.add")}
        style="link"
        disabled={
          isEmpty(selectedRedirection?.id) || !isEmpty(selectedRedirection)
        }
        onClick={() => setSelectedRedirection(NEW_REDIRECTION)}
      />
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        title={t("settings.redirections.delete.title")}
        message={
          <Trans
            components={{ bold: <strong /> }}
            defaults={t("settings.redirections.delete.message", {
              from: selectedRedirection.from,
              to: selectedRedirection.to,
            })}
          />
        }
        onClose={handleClose}
        onSubmit={() => deleteRedirection(selectedRedirection.id)}
      />
    </div>
  );
};

export default Table;
