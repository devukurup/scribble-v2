import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import AppLogo from "images/AppLogo";

import { APP_NAME, NAV_LINKS, RANDOM_PROFILE_IMAGE_URL } from "./constants";

const Sidebar = () => {
  const {
    user: { firstName, lastName, email },
  } = globalProps;

  return (
    <NeetoUISidebar
      appName={APP_NAME}
      navLinks={NAV_LINKS}
      organizationInfo={{
        name: APP_NAME,
        logo: <AppLogo />,
      }}
      profileInfo={{
        name: `${firstName} ${lastName}`,
        imageUrl: RANDOM_PROFILE_IMAGE_URL,
        email,
      }}
    />
  );
};

export default Sidebar;
