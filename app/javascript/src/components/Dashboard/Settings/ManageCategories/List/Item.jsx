import React from "react";

import classNames from "classnames";
import { MenuVertical, Reorder } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const { Menu, MenuItem } = Dropdown;

const Item = ({ provided, category, handleEdit, isDragging }) => {
  const { title } = category;
  const { t } = useTranslation();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={classNames(
        "hover:neeto-ui-bg-gray-100 group my-4 flex justify-between py-2 px-1",
        {
          "neeto-ui-bg-gray-100": isDragging,
        }
      )}
    >
      <div className="relative flex items-center">
        <Reorder
          className={classNames(
            "neeto-ui-text-gray-600 absolute -left-8 opacity-0 group-hover:opacity-100",
            {
              "opacity-100": isDragging,
            }
          )}
        />
        <div className="flex flex-col space-y-1">
          <Typography lineHeight="none" style="h4" weight="normal">
            {title}
          </Typography>
          <Typography
            className="neeto-ui-text-gray-500"
            lineHeight="none"
            style="body2"
            weight="normal"
          >
            6 articles
          </Typography>
        </div>
      </div>
      <Dropdown
        buttonStyle="text"
        icon={() => <MenuVertical className="neeto-ui-text-gray-600" />}
      >
        <Menu>
          <MenuItem.Button onClick={() => handleEdit(category)}>
            {t("common.edit")}
          </MenuItem.Button>
          <MenuItem.Button style="danger">{t("common.delete")}</MenuItem.Button>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default Item;
