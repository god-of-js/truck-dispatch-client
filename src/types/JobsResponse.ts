import Trip from './Trip';

export default interface JobsResponse {
  data: Trip[];
  totalPages: number;
  totalItems: number;
  byCompany: number;
  byShipper: number;
}
