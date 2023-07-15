import React from "react";

import { t } from "i18next";
import { NoData } from "neetoui";

import EmptyImage from "images/Empty";

const Empty = () => (
  <div className="mt-48 flex w-full items-center justify-center">
    <NoData image={<EmptyImage />} title={t("empty.article.public.title")} />
  </div>
);

export default Empty;
