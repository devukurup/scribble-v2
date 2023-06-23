import React, { useEffect, useState } from "react";

import { Switch, Typography, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { isPresent } from "src/utils";

import { useShowSite } from "hooks/useShowSite";
import { useUpdateSite } from "hooks/useUpdateSite";

import Password from "./Password";

const Security = () => {
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isPasswordToggleOn, setIsPasswordToggleOn] = useState(false);

  const { t } = useTranslation();

  const { update } = useUpdateSite();
  const {
    data: { site },
    isLoading,
    refetch,
  } = useShowSite();

  const refetchSiteOnUpdate = () => {
    refetch();
    setIsNewPassword(false);
  };

  useEffect(() => {
    if (isPresent(site)) {
      setIsPasswordProtected(site.is_password_protected);
      setIsPasswordToggleOn(site.is_password_protected);
    }
  }, [site]);

  useEffect(() => {
    if (!isPasswordToggleOn) {
      isPasswordProtected &&
        update({
          payload: { password: null },
          onSuccess: refetchSiteOnUpdate,
        });
    } else {
      !isPasswordProtected && setIsNewPassword(true);
    }
  }, [isPasswordToggleOn]);

  return (
    <div className="m-32 flex w-full flex-col p-5">
      <Typography
        className="neeto-ui-text-gray-700"
        lineHeight="loose"
        style="h2"
        weight="semibold"
      >
        {t("common.security")}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-600"
        lineHeight="normal"
        style="body1"
        weight="normal"
      >
        {t("settings.security.description")}
      </Typography>
      {!isLoading ? (
        <>
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
              isNewPassword={isNewPassword}
              refetchSite={refetchSiteOnUpdate}
              setIsNewPassword={setIsNewPassword}
            />
          )}
        </>
      ) : (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Security;
