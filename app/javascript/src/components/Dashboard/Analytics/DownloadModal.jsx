import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Modal, Typography, Button } from "neetoui";
import ProgressBar from "progressbar";
import { useTranslation } from "react-i18next";

import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import {
  useGeneratePdf,
  useDownloadPdf,
} from "hooks/reactQuery/articles/useAnalyticsApi";

import { FILE_NAME, FINAL_PROGRESS, INITIAL_PROGRESS } from "./constants";

const DownloadModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [message, setMessage] = useState("");

  const handleSuccess = response => {
    FileSaver.saveAs(new Blob([response.request.response]), FILE_NAME);
    onClose();
  };

  const { t } = useTranslation();

  const { mutate: generatePdf } = useGeneratePdf();
  const { isLoading: isDownloading, refetch } = useDownloadPdf({
    onSuccess: response => handleSuccess(response),
  });

  const consumer = createConsumer();

  useEffect(() => {
    if (isOpen) {
      subscribeToReportDownloadChannel({
        consumer,
        setMessage,
        setProgress,
        generatePdf,
      });
    }

    return () => {
      consumer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (progress === FINAL_PROGRESS) {
      setIsLoading(false);
      setMessage(t("analytics.download.ready"));
    }
  }, [progress]);

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      <Modal.Header>
        <Typography style="h3" weight="semibold">
          {message}
        </Typography>
      </Modal.Header>
      <Modal.Body className="my-5">
        <ProgressBar
          barContainerClassName="neeto-ui-bg-gray-200 rounded-md"
          bgColor="#4554FB"
          completed={progress}
          height="20px"
          transitionDuration=".1s"
        />
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <Button
          label={t("common.download")}
          loading={isLoading || isDownloading}
          onClick={refetch}
        />
        <Button
          label={t("common.cancel")}
          style="secondary"
          onClick={onClose}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadModal;
