import PaymentRequest from './PaymentRequest';

export default interface PaymnetPaginatedResponse {
  data: PaymentRequest;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
