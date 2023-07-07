import PaymentRequest from './PaymentRequest';

export default interface PaymentPaginatedResponse {
  data: PaymentRequest;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
