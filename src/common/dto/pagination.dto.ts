export class PagingQuery {
  offset: number;
  limit: number;
  keyword: string;
  filter: { [field: string]: any };
  sort: { field: string, order: 'ASC' | 'DESC' };
}

export class PaginatedData<T> {
  constructor(private items: T[], private total: number = 0) { }
}
