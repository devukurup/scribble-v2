import React from "react";

import { Typography } from "neetoui";

const Wrapper = ({ children, title, description }) => (
  <div className="m-32 flex w-full flex-col p-5">
    <Typography
      className="neeto-ui-text-gray-700"
      lineHeight="loose"
      style="h2"
      weight="semibold"
    >
      {title}
    </Typography>
    <Typography
      className="neeto-ui-text-gray-600"
      lineHeight="normal"
      style="body1"
      weight="normal"
    >
      {description}
    </Typography>
    <div className="my-4 flex items-center justify-between">{children}</div>
  </div>
);

export default Wrapper;
