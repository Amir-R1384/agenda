import { FormEvent, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth, signIn as FB_signIn, usersCollection } from '../api'
import { groupNumberAtom, loadingAtom } from '../atoms'
import { getData, saveData, saveToLS } from '../lib'
import { validGroupNumber } from '../util'
import { Loading } from '../components'

export default function Setup() {
	const navigate = useNavigate()

	const [state, setState] = useState<0 | 1 | 2>(0) // 0: Welcome screen, 1: SignIn, 2: groupNumber screen
	const [loading, setLoading] = useRecoilState(loadingAtom)
	const setGroupNumber = useSetRecoilState(groupNumberAtom)

	const [value, setValue] = useState('')
	const [error, setError] = useState(false)

	const { t } = useTranslation()

	// * Checking the user's authentication status
	useEffect(() => {
		setLoading(true)

		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (!user) {
				setState(1) // Show sign up button
				setLoading(false)
			} else {
				const groupNumber = await getData('groupNumber')

				if (validGroupNumber(groupNumber)) {
					setGroupNumber(groupNumber)
					navigate('/app/')
				} else {
					setState(2) // show group number form
					setLoading(false)
				}
			}
			unsubscribe()
		})
	}, [])

	async function signIn() {
		try {
			setLoading(true)
			const result = await FB_signIn()

			const { uid } = result.user
			const userSnapshot = await getDoc(doc(usersCollection, uid))

			if (userSnapshot.exists()) {
				const groupNumber = userSnapshot.data().groupNumber

				if (validGroupNumber(groupNumber)) {
					saveToLS('groupNumber', groupNumber)
					setGroupNumber(groupNumber)
					navigate('/app/')
				} else {
					setState(2)
					setLoading(false)
				}
			} else {
				await setDoc(doc(usersCollection, uid), {
					groupNumber: 0,
					homeworks: [],
					recoveries: []
				})
				setState(2)
				setLoading(false)
			}
		} catch (err) {
			console.error(err)
		}
	}

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setLoading(true)

		setError(false)
		const groupNumber = Number(value)

		if (!validGroupNumber(groupNumber)) return setError(true)

		await saveData('groupNumber', groupNumber)

		setGroupNumber(groupNumber)
		setLoading(false)
		navigate('/app/')
	}

	return (
		<div className="flex flex-col items-center justify-between min-h-full py-20 bg-white">
			<div className="text-3xl font-semibold text-neutral-800 drop-shadow-md">Egenda</div>

			<div className="flex flex-col w-full px-5 -mt-10 gap-y-10">
				{loading ? (
					<Loading />
				) : state === 1 ? (
					<button
						type="button"
						onClick={signIn}
						className="!py-2 button !bg-red-500 space-x-3">
						<FontAwesomeIcon icon={faGoogle as IconProp} />
						<span className="w-auto">{t('signInWithGoogle')}</span>
					</button>
				) : state === 2 ? (
					<form onSubmit={onSubmit} className="flex flex-col items-stretch gap-y-3">
						<input
							value={value}
							onChange={e => {
								if (!isNaN(Number(e.target.value))) {
									setValue(e.target.value)
								}
							}}
							className={`text-center input ${error && 'error'}`}
							placeholder={t('groupNumber')}
						/>
						<button type="submit" className="!py-1.5 button">
							{t('access')}
						</button>
						<div className="text-xs text-center text-neutral-500">
							{t('signedInAs')}{' '}
							<span className="font-semibold">{auth.currentUser?.email}</span>
						</div>
					</form>
				) : (
					''
				)}
			</div>

			<div className="text-sm text-neutral-500">École secondaire Pierre-Laporte</div>
		</div>
	)
}
