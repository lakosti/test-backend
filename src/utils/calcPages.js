const calcPages = ({ total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);

  //якщо теперішня сторінка !== останній то значитить є наступна
  const hasNextPage = page !== totalPages;
  const hasPrevPage = page !== 1;

  return {
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export default calcPages;
