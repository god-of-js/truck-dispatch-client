import Trip from './Trip';
export default interface TripsPaginatedResponse {
  data: Trip[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pending: number;
  inProgress: number;
  completed: number;
}
