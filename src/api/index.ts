import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import User from '../types/User';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import db, { auth } from './firebase';

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

  getUser(id: string) {
    return this.getItem<User>('user', id);
  }

  sendVerificationDetailsToAdmin(userId: string, data: unknown) {
    return this.setDoc('verification', userId, data);
  }
  private setDoc(
    collectionName: string,
    id: string,
    data: unknown,
  ): Promise<unknown> {
    return setDoc(doc(db, collectionName, id), data);
  }

  private async getCollection(collectionName: string): Promise<unknown> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
