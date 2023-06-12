import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import { SAMPLE_USER, APP_NAME, SIDEBAR_NAV_LINKS } from "./constants";

const Sidebar = () => (
  <NeetoUISidebar
    appName={APP_NAME}
    navLinks={SIDEBAR_NAV_LINKS}
    organizationInfo={{
      name: APP_NAME,
    }}
    profileInfo={{
      name: `${SAMPLE_USER.first_name} ${SAMPLE_USER.last_name}`,
      imageUrl: SAMPLE_USER.profile_image_url,
      email: SAMPLE_USER.email,
    }}
  />
);

export default Sidebar;
