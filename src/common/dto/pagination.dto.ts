export class PaginationQuery {
  offset: number;
  limit: number;
  keyword: string;
  sorts: { field: string, order: 'ASC' | 'DESC' };
  filters: { [name: string]: any };
}

export class PaginationResponse<T> {
  constructor(private items: T[], private total: number = 0) { }
}
