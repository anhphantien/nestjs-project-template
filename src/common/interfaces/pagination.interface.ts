export class IPagination {
  limit: number;
  offset: number;
  keyword: string;
  filter: { [field: string]: any };
  sort: { field: string; order: 'ASC' | 'DESC' };
}
