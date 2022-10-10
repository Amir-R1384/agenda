import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: 'egenda-app.firebaseapp.com',
	projectId: 'egenda-app',
	storageBucket: 'egenda-app.appspot.com',
	messagingSenderId: '990209021527',
	appId: '1:990209021527:web:1be77df93565038f83f512'
}

const app = initializeApp(firebaseConfig)

export default app
