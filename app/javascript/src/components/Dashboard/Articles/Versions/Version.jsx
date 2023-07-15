import React from "react";

import { Button, Modal } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import {
  useShowVersion,
  useRestoreVersion,
} from "hooks/reactQuery/articles/useVersionsApi";

import Content from "./Content";
import Header from "./Header";

const Version = ({
  articleId,
  id,
  isOpen,
  onClose,
  title,
  handleRestoreSuccess,
}) => {
  const { t } = useTranslation();

  const { data: { version } = {}, isLoading } = useShowVersion({
    id,
    articleId,
  });

  const { mutate: restoreVersion, isLoading: isRestoring } = useRestoreVersion({
    onSuccess: handleRestoreSuccess,
  });

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      <Modal.Header>
        <Header title={title} />
      </Modal.Header>
      <Modal.Body className="h-full overflow-auto">
        <Content isLoading={isLoading} version={version} />
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <Button
          disabled={isLoading || isRestoring || isNil(version?.category)}
          label={t("articles.versions.restore")}
          onClick={() => restoreVersion({ id, articleId })}
        />
        <Button label={t("common.cancel")} style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default Version;
