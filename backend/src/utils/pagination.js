const parsePagination = (query) => {
  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize || 10)));
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip, take: pageSize };
};

const paginatedResult = (items, total, page, pageSize) => ({
  items,
  meta: {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize)
  }
});

module.exports = { parsePagination, paginatedResult };
