import Vehicle from './Vehicle';

export default interface VehiclePaginatedResponse {
  data: Vehicle;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
