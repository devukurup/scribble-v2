import React from "react";

import classNames from "classnames";

const Row = ({ children, className }) => (
  <div
    className={classNames(
      "my-2 flex w-full items-center justify-between p-3",
      className
    )}
  >
    {children}
  </div>
);
export default Row;
