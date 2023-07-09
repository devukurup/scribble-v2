import React from "react";

import Existing from "./Existing";
import New from "./New";

const Password = ({ isNewPassword, setIsNewPassword, handleCancel }) => {
  const toggleIsNewPassword = () =>
    setIsNewPassword(isNewPassword => !isNewPassword);

  return (
    <div className="mt-7">
      {isNewPassword ? (
        <New
          handleCancel={handleCancel}
          toggleIsNewPassword={toggleIsNewPassword}
        />
      ) : (
        <Existing toggleIsNewPassword={toggleIsNewPassword} />
      )}
    </div>
  );
};

export default Password;
