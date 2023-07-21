import React from "react";

import { Delete } from "neetoicons";
import { Button, Spinner, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { formattedDate } from "src/utils";

import { useDeleteSchedule } from "hooks/reactQuery/articles/useScheduleApi";

const Show = ({ articleId, schedule, isLoading }) => {
  const { t } = useTranslation();

  const { event, time } = schedule;

  const { mutate: destroy, isLoading: isDeleting } = useDeleteSchedule();

  if (isLoading) return <Spinner />;

  return (
    <div className="flex items-center justify-between rounded-md border-2 py-1 px-3">
      <Typography style="body2" weight="semibold">
        {t("articles.schedule.label")}:
      </Typography>
      <div className="flex items-center space-x-2">
        <Typography style="body2">
          {t("articles.schedule.description", {
            event,
            time: formattedDate(time),
          })}
        </Typography>
        <Button
          disabled={isDeleting}
          icon={Delete}
          loading={isDeleting}
          size="small"
          style="danger-text"
          tooltipProps={{ content: t("articles.schedule.delete") }}
          onClick={() => destroy(articleId)}
        />
      </div>
    </div>
  );
};

export default Show;
