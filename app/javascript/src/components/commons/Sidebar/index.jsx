import React from "react";

import AppLogo from "images/AppLogo";
import { Sidebar as NeetoUISidebar } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { SAMPLE_USER, APP_NAME, NAV_LINKS } from "./constants";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <NeetoUISidebar
      appName={APP_NAME}
      navLinks={NAV_LINKS}
      organizationInfo={{
        name: APP_NAME,
        logo: <img alt={t("common.appLogo")} src={AppLogo} />,
      }}
      profileInfo={{
        name: `${SAMPLE_USER.first_name} ${SAMPLE_USER.last_name}`,
        imageUrl: SAMPLE_USER.profile_image_url,
        email: SAMPLE_USER.email,
      }}
    />
  );
};

export default Sidebar;
