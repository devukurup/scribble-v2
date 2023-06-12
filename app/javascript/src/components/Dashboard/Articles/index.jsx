import React, { useState } from "react";

import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { STATUSES } from "./constants";
import MenuBar from "./MenuBar";

const Articles = () => {
  const [activeStatus, setActiveStatus] = useState(STATUSES[0].label);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  return (
    <>
      <MenuBar
        activeStatus={activeStatus}
        isMenuBarOpen={isMenuBarOpen}
        setActiveStatus={setActiveStatus}
      />
      <div className="mx-4 w-full">
        <Header
          title={t("header.articles.title", { status: activeStatus })}
          actionBlock={
            <Button
              label={t("header.articles.buttonLabel")}
              size="small"
              onClick={() => {}}
            />
          }
          menuBarToggle={() =>
            setIsMenuBarOpen(isMenuBarOpen => !isMenuBarOpen)
          }
          searchProps={{
            value: searchTerm,
            onChange: event => setSearchTerm(event.target.value),
            placeholder: t("header.articles.placeholder"),
          }}
        />
      </div>
    </>
  );
};

export default Articles;
