import React from "react";

import { Hide } from "neetoicons";
import { Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { DEFAULT_PASSWORD } from "./constants";

const Existing = ({ setIsNewPassword }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <Input
        disabled
        className="w-3/4"
        label={t("common.password")}
        name="password"
        suffix={<Hide />}
        type="password"
        value={DEFAULT_PASSWORD}
      />
      <Button
        label={t("common.changeEntity", {
          entity: t("common.password"),
        })}
        onClick={() => setIsNewPassword(true)}
      />
    </div>
  );
};

export default Existing;
