import React from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const { Menu, MenuItem } = Dropdown;

const Statuses = ({ handleUpdate }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      buttonStyle="secondary"
      label={t("common.changeEntity", { entity: t("common.status") })}
    >
      <Menu>
        <MenuItem.Button
          onClick={() => handleUpdate(t("statuses.published").toLowerCase())}
        >
          {t("statuses.publish")}
        </MenuItem.Button>
        <MenuItem.Button
          onClick={() => handleUpdate(t("statuses.draft").toLowerCase())}
        >
          {t("statuses.draft")}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Statuses;
