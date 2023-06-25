import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { ROOT_URL } from "../../constants";
import Form from "../Form";
import Row from "../Row";
import Cell from "../Row/Cell";

const { Menu, MenuItem } = Dropdown;

const Redirection = ({
  setSelectedRedirection,
  onUpdateSubmit,
  isEdit = false,
  redirection,
  onDeleteClick,
  disableOptions = false,
}) => {
  const { t } = useTranslation();
  const { id, from, to } = redirection;

  if (isEdit) {
    return (
      <Form
        id={id}
        initialValues={{ from, to }}
        onClose={() => setSelectedRedirection({})}
        onSubmit={onUpdateSubmit}
      />
    );
  }

  return (
    <Row className="bg-white">
      <Cell>
        <div className="flex items-center space-x-1">
          <Typography className="neeto-ui-text-gray-500" style="body2">
            {ROOT_URL}
          </Typography>
          <Typography style="body2">{from}</Typography>
        </div>
      </Cell>
      <Cell>{to}</Cell>
      <Cell className="w-16">
        <Dropdown
          buttonStyle="text"
          disabled={disableOptions}
          icon={MenuHorizontal}
          style="text"
        >
          <Menu>
            <MenuItem.Button
              onClick={() => setSelectedRedirection(redirection)}
            >
              {t("common.edit")}
            </MenuItem.Button>
            <MenuItem.Button
              style="danger"
              onClick={() => onDeleteClick(redirection)}
            >
              {t("common.delete")}
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      </Cell>
    </Row>
  );
};

export default Redirection;
