import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const { Menu, MenuItem } = Dropdown;

const ActionDropdown = ({ handleDelete, handleEdit }) => {
  const { t } = useTranslation();

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} style="text">
      <Menu>
        <MenuItem.Button onClick={handleEdit}>
          {t("common.edit")}
        </MenuItem.Button>
        <MenuItem.Button style="danger" onClick={handleDelete}>
          {t("common.delete")}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default ActionDropdown;
