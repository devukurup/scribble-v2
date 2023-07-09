import React from "react";

import { Hide } from "neetoicons";
import { Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { capitalize } from "neetocommons/pure";

import { DEFAULT_PASSWORD } from "./constants";

const Existing = ({ toggleIsNewPassword }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <Input
        disabled
        className="w-3/4"
        label={capitalize(t("common.password"))}
        name="password"
        suffix={<Hide />}
        type="password"
        value={DEFAULT_PASSWORD}
      />
      <Button
        label={t("common.changeEntity", {
          entity: t("common.password"),
        })}
        onClick={toggleIsNewPassword}
      />
    </div>
  );
};

export default Existing;
