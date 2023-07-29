import React, { useState } from "react";

import { ActionDropdown } from "neetoui";

import { findBy } from "neetocommons/pure";

import { ARTICLE_STATUSES, STATUS_DROPDOWN_MENU } from "./constants";
import ScheduleModal from "./Schedule/Modal";
import { filterStatusOptions } from "./utils";

const { Menu, MenuItem } = ActionDropdown;

const StatusDropdown = ({ isDisabled, setStatus, status, isEdit }) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleEvent, setScheduleEvent] = useState("");

  const handleStatusChange = value => {
    if (
      value === ARTICLE_STATUSES.published ||
      value === ARTICLE_STATUSES.draft
    ) {
      setStatus(findBy({ value }, STATUS_DROPDOWN_MENU).label);
    } else {
      setScheduleEvent(findBy({ value }, STATUS_DROPDOWN_MENU).event);
      setIsScheduleModalOpen(true);
    }
  };

  return (
    <>
      <ActionDropdown
        buttonProps={{ type: "submit", disabled: isDisabled }}
        label={status}
      >
        <Menu>
          {filterStatusOptions({ isEdit, status })?.map(({ label, value }) => (
            <MenuItem.Button
              isActive={status === label}
              key={value}
              onClick={() => handleStatusChange(value)}
            >
              {label}
            </MenuItem.Button>
          ))}
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
