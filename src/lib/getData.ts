import { doc, getDoc } from 'firebase/firestore'
import { auth, usersCollection } from '../api/firebase'
import config from '../config'
import saveToLS from './saveToLS'

// Always assuming the user is logged in

export default async function getData(dataName: string): Promise<any> {
	// 1: From localStorage
	const { appPrefix } = config

	const dataFromLS = localStorage.getItem(`${appPrefix}-${dataName}`)
	if (dataFromLS !== null) {
		return JSON.parse(dataFromLS)
	}

	// 2: From server
	const docSnapshot = await getDoc(doc(usersCollection, auth.currentUser!.uid))
	const dataFromFB = docSnapshot.data()![dataName]

	// Also saving to localStorage to sync it
	saveToLS(dataName, dataFromFB)

	return dataFromFB
}
