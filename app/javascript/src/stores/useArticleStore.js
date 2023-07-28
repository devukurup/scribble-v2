import { create } from "zustand";

import { INITIAL_FILTERS, COLUMNS } from "Dashboard/Articles/constants";

const useArticleStore = create(set => ({
  filters: INITIAL_FILTERS,
  isDeleteAlertOpen: false,
  selectedArticleRowIds: [],
  selectedColumns: COLUMNS,
  articles: {},

  setFilters: payload =>
    set(({ filters }) => ({ filters: { ...filters, ...payload } })),
  setIsDeleteAlertOpen: payload => set({ isDeleteAlertOpen: payload }),
  setSelectedArticleRowIds: payload => set({ selectedArticleRowIds: payload }),
  setSelectedColumns: payload => set({ selectedColumns: payload }),
  setArticles: payload => set({ articles: payload }),
}));

export default useArticleStore;
