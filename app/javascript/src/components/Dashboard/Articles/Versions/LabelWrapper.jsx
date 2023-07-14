import React from "react";

import { Label } from "neetoui";

const LabelWrapper = ({ children, title }) => (
  <div className="flex flex-col">
    <Label className="neeto-ui-text-gray-600 py-1" lineHeight="none">
      {title}
    </Label>
    {children}
  </div>
);

export default LabelWrapper;
