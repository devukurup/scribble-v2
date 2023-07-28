import React from "react";

import { EditorContent } from "neetoeditor";
import { Warning } from "neetoicons";
import { Typography, Spinner, Callout } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { SINGULAR } from "src/constants";

import { capitalize } from "neetocommons/pure";
import Scrollable from "neetomolecules/Scrollable";

import LabelWrapper from "./LabelWrapper";

const Content = ({ version, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      {isNil(version.category) ? (
        <Callout icon={Warning} style="warning">
          {t("articles.versions.error.category")}
        </Callout>
      ) : (
        <LabelWrapper title={capitalize(t("common.category", SINGULAR))}>
          <Typography className="w-full border p-2" style="body1">
            {version.category}
          </Typography>
        </LabelWrapper>
      )}
      <LabelWrapper title={t("common.title")}>
        <Typography className="w-full border p-2" style="body1">
          {version.title}
        </Typography>
      </LabelWrapper>
      <LabelWrapper title={t("common.description")}>
        <Scrollable className="flex h-96 w-full flex-col space-y-4 border py-3 px-2">
          <EditorContent className="text-base" content={version.body} />
        </Scrollable>
      </LabelWrapper>
    </div>
  );
};

export default Content;
