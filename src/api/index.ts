import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  WhereFilterOp,
  onSnapshot,
} from 'firebase/firestore';
import 'firebase/firestore';
import User from '../types/User';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import db, { auth } from './firebase';
import Trip from 'types/Trip';
import Bid from 'types/Bid';
import Payment from 'types/Payment';
import Rating from 'types/Rating';
import PaymentRequest from 'types/PaymentRequest';
import Chat from 'types/Chat';

class ApiService {
  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => user,
    );
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password).then(
      ({ user }) => user,
    );
  }

  recordAccountDetails(data: User) {
    return this.setDoc('user', data.id, data);
  }

  getUsers() {
    return this.getCollection<User>('user');
  }

  sendVerificationDetailsToAdmin(userId: string, data: unknown) {
    return this.setDoc('verification', userId, data);
  }

  saveAsset(id: string, url: string) {
    // In case of future migrations to different asset servers.
    return this.setDoc('assets', id, { id, url });
  }

  publishUserRating(data: Rating) {
    return this.setDoc('rating', data.id, data);
  }

  createOrUpdateTrip(data: Trip) {
    return this.setDoc('trip', data.id, data);
  }

  getAgentTrips(agentId: string) {
    return this.query<Trip>({
      collectionName: 'trip',
      key: 'agentId',
      condition: '==',
      value: agentId,
    });
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

  getTransporterTrips(transporterId: string) {
    return this.query<Trip>({
      collectionName: 'trip',
      key: 'transporterId',
      condition: '==',
      value: transporterId,
    });
  }

  getJobs() {
    // Jobs are trips that haven't been claimed by any transporter and
    return this.query<Trip>({
      collectionName: 'trip',
      key: 'status',
      condition: '==',
      value: 'awaiting_bid',
    });
  }

  createOrUpdateBid(data: Bid) {
    return this.setDoc('bid', data.id, data);
  }

  createOrUpdatePayment(data: Payment) {
    return this.setDoc('payment', data.id, data);
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

  getBidsWithTripId(tripId: string) {
    return this.query<Bid>({
      collectionName: 'bid',
      key: 'tripId',
      condition: '==',
      value: tripId,
    });
  }

  sendChat(chat: Chat) {
    return this.setDoc('chat', chat.id, chat);
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

  private async getItem<T>(key: string, value: string): Promise<T> {
    const docRef = doc(db, key, value);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      throw new Error('404: Document not found');
    }
  }

  private patch(url: string, data: unknown): unknown {
    return { url, data };
  }

  private remove(url: string) {
    return { url };
  }
}

export default new ApiService();
