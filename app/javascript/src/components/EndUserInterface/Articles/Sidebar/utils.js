export const isCategoryActive = ({ articles, slug, activeIndexes, index }) =>
  activeIndexes.includes(index) ||
  articles.some(article => article.slug === slug);
