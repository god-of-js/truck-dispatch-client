import { collection, addDoc, getDocs } from 'firebase/firestore'

import db from './firebase'

class ApiService {
  private create (collectionName: string, data: unknown): Promise<unknown> {
    return addDoc(collection(db, collectionName), data)
  }

  private async getCollection (collectionName: string): Promise<unknown> {
    const rawObjects = await getDocs(collection(db, collectionName))
    return rawObjects.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  }

  private patch (url: string, data: unknown): unknown {
    return { url, data}
  }

  private remove (url: string) {
    return { url }
  }
}

export default new ApiService()
