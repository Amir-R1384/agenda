import { collection, getFirestore } from 'firebase/firestore'
import app from './init'

const db = getFirestore(app)

const usersCollection = collection(db, 'users')

export { db, usersCollection }
