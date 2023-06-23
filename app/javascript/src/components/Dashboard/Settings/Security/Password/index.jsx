import React from "react";

import Existing from "./Existing";
import New from "./New";

const Password = ({ isNewPassword, setIsNewPassword, refetchSite }) => (
  <div className="mt-7">
    {isNewPassword ? (
      <New refetchSite={refetchSite} />
    ) : (
      <Existing setIsNewPassword={setIsNewPassword} />
    )}
  </div>
);

export default Password;
