import React, { useState } from "react";

import { ActionDropdown } from "neetoui";

import { findBy } from "neetocommons/pure";

import { ARTICLE_STATUSES, STATUS_DROPDOWN_MENU } from "./constants";
import ScheduleModal from "./Schedule/Modal";
import { filterStatusOptions } from "./utils";

const { Menu, MenuItem } = ActionDropdown;

const StatusDropdown = ({
  isDisabled,
  setStatus,
  status,
  isEdit,
  articleStatus,
  isSubmitting,
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleEvent, setScheduleEvent] = useState("");

  const handleStatusChange = value => {
    if (
      value === ARTICLE_STATUSES.published ||
      value === ARTICLE_STATUSES.draft
    ) {
      setStatus(findBy({ value }, STATUS_DROPDOWN_MENU));
    } else {
      setScheduleEvent(findBy({ value }, STATUS_DROPDOWN_MENU).event);
      setIsScheduleModalOpen(true);
    }
  };

  return (
    <>
      <ActionDropdown
        label={status.label}
        buttonProps={{
          type: "submit",
          disabled: isDisabled,
          loading: isSubmitting,
        }}
      >
        <Menu>
          {filterStatusOptions({ isEdit, status, articleStatus })?.map(
            ({ label, value }) => (
              <MenuItem.Button
                isActive={status.label === label}
                key={value}
                onClick={() => handleStatusChange(value)}
              >
                {label}
              </MenuItem.Button>
            )
          )}
        </Menu>
      </ActionDropdown>
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        scheduleEvent={scheduleEvent}
        setScheduleEvent={setScheduleEvent}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  );
};

export default StatusDropdown;
