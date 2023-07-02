import React from "react";

import { t } from "i18next";
import { Button } from "neetoui";
import routes from "src/routes";

import ErrorImage from "images/Error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex h-screen w-2/3 flex-col items-center justify-center space-y-5">
          <img alt={t("common.errorImage")} className="ml-5" src={ErrorImage} />
          <Button
            label={t("common.redirectToHome")}
            size="large"
            onClick={() => (window.location.href = routes.dashboard)}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
