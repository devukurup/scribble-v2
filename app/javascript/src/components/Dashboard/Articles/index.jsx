import React, { useState } from "react";

import categoriesApi from "apis/categories";
import CreateCategory from "Dashboard/Categories/Create";
import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { STATUSES } from "./constants";
import MenuBar from "./MenuBar";

const Articles = () => {
  const [activeStatus, setActiveStatus] = useState(STATUSES[0].label);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const { t } = useTranslation();

  const fetchCategories = async () => {
    try {
      setIsCategoriesLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  return (
    <>
      <MenuBar
        activeStatus={activeStatus}
        categories={categories}
        fetchCategories={fetchCategories}
        isCategoriesLoading={isCategoriesLoading}
        isMenuBarOpen={isMenuBarOpen}
        setActiveStatus={setActiveStatus}
        setIsCreateModalOpen={setIsCreateModalOpen}
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
      <CreateCategory
        isOpen={isCreateModalOpen}
        refetch={fetchCategories}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Articles;
