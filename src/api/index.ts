import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import 'firebase/firestore';
import User from '../types/User';
import db from './firebase';
import axiosInstance from './AxiosInstance';
import Trip from 'types/Trip';
import Bid from 'types/Bid';
import Payment from 'types/Payment';
import Rating from 'types/Rating';
import PaymentRequest from 'types/PaymentRequest';
import Chat from 'types/Chat';
import Verification from 'types/Verification';
import BankAccount from 'types/BankAccount';
import VerifyPhoneData from 'types/VerifyPhoneData';
import NewTrip from 'types/NewTrip';
import { Toast } from 'utils/toast';
import AssignTripFormData from 'types/AssignTripFormData';

class ApiService {
  createUser(userData: User) {
    return this.post('/auth/join', userData);
  }

  signInWithEmailAndPassword(data: { email: string; password: string }) {
    return this.post('/auth/login', data);
  }

  requestVerificationCode(data: { phone: string }) {
    return this.post('/auth/request-sms', data);
  }

  verifyPhone(data: VerifyPhoneData) {
    return this.post('/auth/verify-phone', data);
  }

  createTrip(data: NewTrip): Promise<Trip> {
    return this.post('/trips', data);
  }

  updateTrip(data: Partial<Trip>): Promise<Trip> {
    return this.patch(`/trips/${data._id}`, data);
  }

  getTrips(): Promise<Trip[]> {
    return this.get('/trips');
  }

  recordAccountDetails(data: User) {
    return this.setDoc('user', data._id, data);
  }

  getUser() {
    return this.get<User>('/user');
  }

  getUsers() {
    return this.getCollection<User>('user');
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

  saveAsset(id: string, url: string) {
    // In case of future migrations to different asset servers.
    return this.setDoc('assets', id, { id, url });
  }

  saveAccountNumber(accountDetails: BankAccount) {
    return this.setDoc('bank-account', accountDetails.id, accountDetails);
  }

  getAccountNumber(id: string) {
    return this.getItem<BankAccount>('bank-account', id);
  }

  publishUserRating(data: Rating) {
    return this.setDoc('rating', data.id, data);
  }
  getRatings(
    value: string,
    queryKey: 'transporterId' | 'tripId' = 'transporterId',
  ) {
    return this.query<Rating>({
      collectionName: 'rating',
      key: queryKey,
      condition: '==',
      value,
    });
  }

  getJobs() {
    return this.get<Trip[]>('/trips/jobs');
  }

  createBid(data: Bid) {
    return this.post<Bid>('/bids', data);
  }
  updateBid(data: Bid): Promise<Bid> {
    return this.patch<Bid>(`/bids/${data.tripId}`, data);
  }

  createOrUpdatePayment(data: Payment) {
    return this.setDoc('payment', data._id, data);
  }

  requestPaymentByTransporter(data: PaymentRequest) {
    return this.setDoc('payment-request', data.id, data);
  }

  getPaymentRequestsOfDriver(id: string) {
    return this.query<PaymentRequest>({
      collectionName: 'payment-request',
      key: 'transporterId',
      condition: '==',
      value: id,
    });
  }

  getPaymentRequestByTripId(id: string) {
    return this.getItem<PaymentRequest>('payment-request', id);
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

  private get<T>(url: string): Promise<T> {
    return axiosInstance()
      .get(url)
      .then(({ data }) => data.data) as Promise<T>;
  }

  private post<T>(url: string, data: unknown, isMultipart = false): Promise<T> {
    return axiosInstance(isMultipart)
      .post(url, data)
      .then(({ data }) => {
        Toast.success({ msg: data.message });
        return data.data;
      })
      .catch((e) => {
        console.log(e)
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
        console.log(e)
        Toast.error({ msg: e.message });
        return Promise.reject(e);
      });
  }
  private setDoc(
    collectionName: string,
    id: string,
    data: unknown,
  ): Promise<unknown> {
    return setDoc(doc(db, collectionName, id), data);
  }

  private async getCollection<T>(collectionName: string): Promise<T[]> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as T[];
  }

  private async query<T = unknown>({
    collectionName,
    key,
    condition,
    value,
  }: {
    collectionName: string;
    key: string;
    condition: WhereFilterOp;
    value: string;
  }): Promise<T[]> {
    const dbRef = collection(db, collectionName);
    const rawQuery = query(dbRef, where(key, condition, value));
    const snapShots = await getDocs(rawQuery);
    const documentList: T[] = [];
    snapShots.forEach((doc) => {
      documentList.push(doc.data() as T);
    });
    return documentList;
  }

  private async getItem<T>(collectionName: string, id: string): Promise<T> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      throw new Error('404: Document not found');
    }
  }

  private remove(url: string) {
    return { url };
  }
}

export default new ApiService();
