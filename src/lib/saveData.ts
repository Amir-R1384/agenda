import { updateDoc, doc } from 'firebase/firestore'
import { auth, usersCollection } from '../api'
import saveToLS from './saveToLS'

// Always assuming the user is logged in

export default async function saveData(key: string, value: any): Promise<void> {
	// 1: Saving to server
	await updateDoc(doc(usersCollection, auth.currentUser!.uid), { [key]: value })

	// 2: Saving to localStorage
	saveToLS(key, value)
}
