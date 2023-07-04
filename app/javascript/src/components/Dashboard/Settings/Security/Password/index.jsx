import React from "react";

import Existing from "./Existing";
import New from "./New";

const Password = ({
  isNewPassword,
  setIsNewPassword,
  refetchSite,
  handleCancel,
}) => (
  <div className="mt-7">
    {isNewPassword ? (
      <New handleCancel={handleCancel} refetchSite={refetchSite} />
    ) : (
      <Existing setIsNewPassword={setIsNewPassword} />
    )}
  </div>
);

export default Password;
