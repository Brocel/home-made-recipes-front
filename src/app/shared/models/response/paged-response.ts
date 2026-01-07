/** Réponse paginée générique (à adapter si ton backend renvoie { data, meta } ou autre) */
export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
