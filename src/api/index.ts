import User from '../types/User';
import axiosInstance from './AxiosInstance';
import Trip from 'types/Trip';
import Bid from 'types/Bid';
import Rating from 'types/Rating';
import PaymentRequest from 'types/PaymentRequest';
import Chat from 'types/Chat';
import Verification from 'types/Verification';
import VerifyPhoneData from 'types/VerifyPhoneData';
import NewTrip from 'types/NewTrip';
import { Toast } from 'utils/toast';
import AssignTripFormData from 'types/AssignTripFormData';
import { Bank } from './paystackIntegrations';
import AccountDetails from 'types/AccountDetails';
import BankDetails from 'types/BankDetails';
import TokenVerificationData from 'types/TokenVerificationData';
import LoginResponse from 'types/LoginResponse';

class ApiService {
  createUser(userData: User) {
    return this.post<TokenVerificationData>('/auth/join', userData);
  }

  signInWithEmailAndPassword(data: { email: string; password: string }) {
    return this.post<LoginResponse>('/auth/login', data);
  }

  requestVerificationCode(data: { phone: string }) {
    return this.post<TokenVerificationData>('/auth/request-sms', data);
  }

  verifyPhone(data: VerifyPhoneData) {
    return this.post('/auth/verify-phone', data);
  }

  updateUser(data: FormData) {
    return this.patch<User>('/user', data);
  }

  createTrip(data: NewTrip): Promise<Trip> {
    return this.post('/trips', data);
  }

  updateTrip(data: Partial<Trip>): Promise<Trip> {
    return this.patch(`/trips/${data._id}`, data);
  }
  updateTripStatus(tripId: string, status: string): Promise<Trip> {
    return this.patch(`/trips/${tripId}/change-status/${status}`);
  }

  getTrips(): Promise<Trip[]> {
    return this.get('/trips');
  }

  getUser() {
    return this.get<User>('/user');
  }

  startVerificationProcess(data: FormData) {
    return this.post('/verification', data);
  }

  updateVerification(data: FormData) {
    return this.patch('/verification', data);
  }

  getVerificationByUserId() {
    return this.get<Verification>('/verification');
  }

  assignTrip(data: AssignTripFormData) {
    return this.post<Trip>(`/trips/${data.tripId}/assign-trip`, data);
  }

  saveAccountNumber(accountDetails: BankDetails) {
    return this.post<User>('/user/bank-details', accountDetails);
  }

  updateAccountNumber(accountDetails: BankDetails) {
    return this.patch<User>('/user/bank-details', accountDetails);
  }

  getJobs() {
    return this.get<Trip[]>('/trips/jobs');
  }
  uploadTDO(formData: FormData, tripId: string) {
    return this.post<Trip>(`/trips/${tripId}/upload-tdo`, formData);
  }

  createBid(data: Bid) {
    return this.post<Bid>('/bids', data);
  }
  updateBid(data: Bid): Promise<Bid> {
    return this.patch<Bid>(`/bids/${data.tripId}`, data);
  }

  requestPaymentByTransporter(
    data: FormData,
    tripId: string,
  ): Promise<PaymentRequest> {
    return this.post(`/payment/request-payment/trip/${tripId}`, data);
  }
  updatePaymentRequest(
    data: FormData,
    tripId: string,
    paymentRequestId: string,
  ): Promise<PaymentRequest> {
    return this.patch(
      `/payment/request-payment/trip/${tripId}/update/${paymentRequestId}`,
      data,
    );
  }

  getPaymentRequestsOfDriver() {
    return this.get<PaymentRequest[]>('/payment/payment-requests');
  }

  getPaymentRequestByTripId(tripId: string) {
    return this.get<PaymentRequest>(`/payment/payment-request/trip/${tripId}`);
  }
  rejectPaymentRequest(
    tripId: string,
    paymentRequestId: string,
    data: { reasonForReject: string },
  ) {
    return this.post<PaymentRequest>(
      `/payment/payment-request/trip/${tripId}/reject/${paymentRequestId}`,
      data,
    );
  }
  approvePaymentRequest(tripId: string, paymentRequestId: string) {
    return this.post<PaymentRequest>(
      `/payment/payment-request/trip/${tripId}/approve/${paymentRequestId}`,
    );
  }

  getBidsWithTripId(tripId: string) {
    return this.get<Bid[]>(`/bids/${tripId}`);
  }
  getTransporterBidWithTripId(tripId: string) {
    return this.get<Bid>(`/bids/transporter-bid/${tripId}`);
  }

  createChat(chat: Chat) {
    return this.post('/chat', chat);
  }

  getChatsByUserId(userId: string) {
    return this.get<Chat[]>(`/chat/user/${userId}`);
  }

  setChatHasBeenRead(chatId: string) {
    return this.patch<Chat>(`/chat/read/${chatId}`);
  }

  getBanks(): Promise<Bank[]> {
    return this.get('/externals/banks');
  }

  getRating(tripId: string) {
    return this.get<Rating>(`/rating/${tripId}`);
  }

  loadAccountDetails(
    bankCode: string,
    accountNumber: string,
  ): Promise<AccountDetails> {
    return this.get(
      `/externals/banks/account?account_number=${accountNumber}&bank_code=${bankCode}`,
    );
  }

  private get<T>(url: string): Promise<T> {
    return axiosInstance()
      .get(url)
      .then(({ data }) => data.data) as Promise<T>;
  }

  private post<T>(url: string, data?: unknown): Promise<T> {
    return axiosInstance()
      .post(url, data)
      .then(({ data }) => {
        Toast.success({ msg: data.message });
        return data.data;
      })
      .catch((e) => {
        console.log(e);
        Toast.error({ msg: e.message });
        return Promise.reject(e);
      });
  }

  private patch<T>(url: string, data?: unknown): Promise<T> {
    return axiosInstance()
      .patch(url, data)
      .then(({ data }) => {
        Toast.success({ msg: data.message });
        return data.data;
      })
      .catch((e) => {
        console.log(e);
        Toast.error({ msg: e.message });
        return Promise.reject(e);
      });
  }

  publishUserRating(data: Rating) {
    return this.post(`/rating/${data.tripId}`, data);
  }
}

export default new ApiService();
