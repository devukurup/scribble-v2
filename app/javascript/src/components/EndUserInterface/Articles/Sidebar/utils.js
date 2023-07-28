import { existsBy } from "neetocommons/pure";

export const isCategoryActive = ({ articles, slug, activeIndexes, index }) =>
  activeIndexes.includes(index) || existsBy({ slug }, articles);
