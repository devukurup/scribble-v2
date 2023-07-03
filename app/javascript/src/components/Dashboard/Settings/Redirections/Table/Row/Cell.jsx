import React from "react";

import classNames from "classnames";

const Cell = ({
  children,
  className = "w-full flex justify-start items-center px-2",
}) => <div className={classNames(className)}>{children}</div>;

export default Cell;
