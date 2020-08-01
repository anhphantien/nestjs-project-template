import _ = require('lodash');

export const PaginationMiddleware = (config: {
  defaultSize?: number;
  maxSize?: number;
  filterFields?: string[];
  sortFields: string[];
  defaultSort: { field: string, order: 'ASC' | 'DESC' };
}) => (req, res, next) => {
  const defaultConfig = { defaultSize: 10, maxSize: 100, filterFields: [] };
  const { defaultSize, maxSize, filterFields, sortFields, defaultSort } = { ...defaultConfig, ...config };

  const pagination: any = {};

  const size = req.query.size || defaultSize;
  pagination.limit = Math.min(size, maxSize);

  const page = req.query.page || 1;
  pagination.offset = pagination.limit * (page - 1);

  if (req.query.keyword) {
    pagination.keyword = req.query.keyword;
  }

  try {
    const filter = JSON.parse(req.query.filter);
    pagination.filter = _.pick(filter, filterFields);
  } catch (error) { }

  try {
    const sort = JSON.parse(req.query.sort);
    if (sortFields.includes(sort.field) && ['ASC', 'DESC'].includes(sort.order)) {
      pagination.sort = sort;
    } else {
      pagination.sort = defaultSort;
    }

    req.pagination = pagination;
    next();
  } catch (error) {
    pagination.sort = defaultSort;

    req.pagination = pagination;
    next();
  }
};
