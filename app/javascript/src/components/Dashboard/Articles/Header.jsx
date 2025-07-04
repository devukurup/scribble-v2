import React, { useEffect } from "react";

import { Button } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "src/routes";

import useDebounce from "hooks/useDebounce";
import useArticlesStore from "stores/useArticlesStore";

import { buildUrlParams } from "./utils";

const Header = ({ toggleMenubar }) => {
  const { filters, setFilters } = useArticlesStore.pick();

  const { activeStatus: status, searchTerm } = filters;

  const { t } = useTranslation();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const history = useHistory();

  useEffect(() => {
    buildUrlParams({ search: debouncedSearchTerm.trim() });
  }, [debouncedSearchTerm]);

  return (
    <NeetoUIHeader
      menuBarToggle={toggleMenubar}
      title={t("dashboard.header.title", { status: t(`statuses.${status}`) })}
      actionBlock={
        <Button
          label={t("dashboard.header.buttonLabel")}
          onClick={() => history.push(routes.articles.new)}
        />
      }
      searchProps={{
        value: searchTerm,
        onChange: event => setFilters({ searchTerm: event.target.value }),
        placeholder: t("dashboard.header.placeholder"),
      }}
    />
  );
};

export default Header;
