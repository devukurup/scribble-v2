import React from "react";

import { Typography } from "neetoui";

const Wrapper = ({ children, title, description }) => (
  <div className="m-32 flex w-full flex-col p-2">
    <Typography
      className="neeto-ui-text-gray-700 px-8"
      lineHeight="loose"
      style="h2"
      weight="semibold"
    >
      {title}
    </Typography>
    <Typography
      className="neeto-ui-text-gray-600 px-8"
      lineHeight="normal"
      style="body1"
      weight="normal"
    >
      {description}
    </Typography>
    <div className="my-4 flex w-full flex-col items-center justify-start overflow-y-auto overflow-x-visible px-8">
      {children}
    </div>
  </div>
);

export default Wrapper;
