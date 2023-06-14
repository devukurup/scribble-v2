export const isCategoryPresent = ({ categoryId, categories }) =>
  categories.some(({ id }) => categoryId === id);

export const removeCategory = ({ categoryId, categories }) =>
  categories.filter(({ id }) => categoryId !== id);
