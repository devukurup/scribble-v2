import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import AppLogo from "images/AppLogo";

import { SAMPLE_USER, APP_NAME, NAV_LINKS } from "./constants";

const Sidebar = () => (
  <NeetoUISidebar
    appName={APP_NAME}
    navLinks={NAV_LINKS}
    organizationInfo={{
      name: APP_NAME,
      logo: <AppLogo />,
    }}
    profileInfo={{
      name: `${SAMPLE_USER.first_name} ${SAMPLE_USER.last_name}`,
      imageUrl: SAMPLE_USER.profile_image_url,
      email: SAMPLE_USER.email,
    }}
  />
);

export default Sidebar;
