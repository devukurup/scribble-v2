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

  if (isLoading || isDeleting) {
    return <Spinner />;
  }

  return (
    <div className="neeto-ui-bg-gray-200 m-2 flex items-center justify-end">
      <Typography>
        {t("articles.schedule.description", {
          event,
          time: formattedDate(time),
        })}
      </Typography>
      <Button
        icon={Delete}
        style="danger-text"
        tooltipProps={{ content: t("articles.schedule.delete") }}
        onClick={() => destroy(articleId)}
      />
    </div>
  );
};

export default Show;
