export const formatCategories = categories =>
  categories?.map(({ title, id }) => ({ label: title, value: id }));
