import { collection, addDoc, getDocs } from 'firebase/firestore';
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
    return this.create('user', data);
  }

  private create(collectionName: string, data: unknown): Promise<unknown> {
    return addDoc(collection(db, collectionName), data);
  }

  private async getCollection(collectionName: string): Promise<unknown> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  private patch(url: string, data: unknown): unknown {
    return { url, data };
  }

  private remove(url: string) {
    return { url };
  }
}

export default new ApiService();
