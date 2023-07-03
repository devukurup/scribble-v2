import React from "react";

import { truncate } from "@bigbinary/neeto-commons-frontend/pure";
import { Tooltip } from "@bigbinary/neetoui";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useUpdateRedirection } from "src/hooks/reactQuery/useRedirectionsApi";

import {
  DEFAULT_SELECTED_REDIRECTION,
  FROM_PATH_TRUNCATE_LENGTH,
  ROOT_URL,
  TO_PATH_TRUNCATE_LENGTH,
} from "../../constants";
import Form from "../Form";
import Row from "../Row";
import Cell from "../Row/Cell";

const { Menu, MenuItem } = Dropdown;

const Redirection = ({
  setSelectedRedirection,
  isEdit = false,
  redirection,
  onDeleteClick,
  disableOptions = false,
}) => {
  const { t } = useTranslation();
  const { id, from, to } = redirection;

  const { mutate: updateRedirection, isLoading: isUpdating } =
    useUpdateRedirection({
      options: {
        onSuccess: () => setSelectedRedirection(DEFAULT_SELECTED_REDIRECTION),
      },
    });

  const handleUpdate = payload =>
    updateRedirection({ id: redirection.id, payload });

  if (isEdit) {
    return (
      <Form
        id={id}
        initialValues={{ from, to }}
        isSubmitting={isUpdating}
        onClose={() => setSelectedRedirection(DEFAULT_SELECTED_REDIRECTION)}
        onSubmit={handleUpdate}
      />
    );
  }

  return (
    <Row className="bg-white">
      <Cell>
        <Tooltip
          content={from}
          disabled={from.length <= FROM_PATH_TRUNCATE_LENGTH}
        >
          <div className="flex items-center space-x-1">
            <Typography className="neeto-ui-text-gray-500" style="body2">
              {ROOT_URL}
            </Typography>
            <Typography style="body2">
              {truncate(from, FROM_PATH_TRUNCATE_LENGTH)}
            </Typography>
          </div>
        </Tooltip>
      </Cell>
      <Cell>
        <Tooltip content={to} disabled={to.length <= TO_PATH_TRUNCATE_LENGTH}>
          <Typography>{truncate(to, TO_PATH_TRUNCATE_LENGTH)}</Typography>
        </Tooltip>
      </Cell>
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
