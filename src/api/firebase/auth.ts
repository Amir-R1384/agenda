import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import config from '../../config'

const auth = getAuth()
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account'
})

auth.languageCode = window.navigator?.language || config.fallbackLng

async function signIn(): Promise<UserCredential> {
	try {
		const result = await signInWithPopup(auth, provider)
		return result
	} catch (err) {
		throw err
	}
}

export { auth, signIn }
