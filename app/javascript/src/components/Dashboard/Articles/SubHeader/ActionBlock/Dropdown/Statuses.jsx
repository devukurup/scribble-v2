import React from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const { Menu, MenuItem } = Dropdown;

const Statuses = ({ handleUpdate }) => {
  const { t } = useTranslation();

  return (
    <Dropdown buttonStyle="secondary" label={t("common.changeStatus")}>
      <Menu>
        <MenuItem.Button
          onClick={() => handleUpdate(t("statuses.published").toLowerCase())}
        >
          {t("articles.publish")}
        </MenuItem.Button>
        <MenuItem.Button
          onClick={() => handleUpdate(t("statuses.draft").toLowerCase())}
        >
          {t("articles.draft")}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Statuses;
