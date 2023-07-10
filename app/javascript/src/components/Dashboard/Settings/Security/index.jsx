import React, { useEffect, useState } from "react";

import { Switch, Typography, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { isPresent } from "src/utils";

import { useShowSite, useUpdateSite } from "hooks/reactQuery/useSiteApi";

import Password from "./Password";

import Wrapper from "../Wrapper";

const Security = () => {
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isPasswordToggleOn, setIsPasswordToggleOn] = useState(false);

  const { t } = useTranslation();

  const { data: { site } = {}, isLoading } = useShowSite();
  const { mutate: update, isLoading: isUpdating } = useUpdateSite();

  const handleCancel = () => {
    isPasswordProtected
      ? setIsNewPassword(false)
      : setIsPasswordToggleOn(false);
  };

  useEffect(() => {
    if (isPresent(site)) {
      setIsPasswordProtected(site.isPasswordProtected);
      setIsPasswordToggleOn(site.isPasswordProtected);
    }
  }, [site]);

  useEffect(() => {
    if (!isPasswordToggleOn) {
      isPasswordProtected &&
        update(
          { password: null },
          { onSuccess: () => setIsNewPassword(false) }
        );
    } else {
      !isPasswordProtected && setIsNewPassword(true);
    }
  }, [isPasswordToggleOn]);

  if (isLoading || isUpdating) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Wrapper
      description={t("settings.security.description")}
      title={t("common.security")}
    >
      <div className="flex w-2/3 flex-col">
        <div className="mt-5 flex justify-between">
          <Typography style="body1" weight="medium">
            {t("settings.security.switchLabel")}
          </Typography>
          <Switch
            checked={isPasswordToggleOn}
            onChange={() =>
              setIsPasswordToggleOn(isPasswordToggleOn => !isPasswordToggleOn)
            }
          />
        </div>
        {isPasswordToggleOn && (
          <Password
            handleCancel={handleCancel}
            isNewPassword={isNewPassword}
            setIsNewPassword={setIsNewPassword}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Security;
