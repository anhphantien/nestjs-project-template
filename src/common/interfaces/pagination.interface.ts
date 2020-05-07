export class IPagination {
  offset: number;
  limit: number;
  keyword: string;
  filter: { [field: string]: any };
  sort: { field: string, order: 'ASC' | 'DESC' };
}
