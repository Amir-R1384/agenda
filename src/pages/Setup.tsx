import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth, signIn as FB_signIn, usersCollection } from '../api'
import { loadingAtom } from '../atoms'
import { InstallGuide, InstallNotice, Loading } from '../components'

export default function Setup() {
	const navigate = useNavigate()

	const [state, setState] = useState<0 | 1>(0) // 0: Welcome screen, 1: Sign In
	const [loading, setLoading] = useRecoilState(loadingAtom)

	const [installNoticePopup, setInstallNoticePopup] = useState(false)
	const [installGuidePopup, setInstallGuidePopup] = useState(false)

	const { t } = useTranslation()

	// * Checking the user's authentication status
	useEffect(() => {
		setLoading(true)

		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (!user) {
				setState(1) // Show sign up button
			} else {
				navigate('/app/')
			}
			setLoading(false)
			unsubscribe()
		})
	}, [])

	// * Showing install message
	useEffect(() => {
		if (
			state !== 0 &&
			!localStorage.installNoticeShown &&
			!window.matchMedia('(display-mode: standalone)').matches
		) {
			setInstallNoticePopup(true)
			localStorage.installNoticeShown = true
		}
	}, [state, localStorage])

	async function signIn() {
		try {
			setLoading(true)
			const result = await FB_signIn()

			const { uid } = result.user
			const userSnapshot = await getDoc(doc(usersCollection, uid))

			if (userSnapshot.exists()) {
				navigate('/app/')
			} else {
				await setDoc(doc(usersCollection, uid), {
					schedule: {},
					homeworks: [],
					recoveries: []
				})
				setLoading(false)
			}
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="flex flex-col items-center justify-between min-h-full py-20 bg-white">
			{installNoticePopup && <InstallNotice setPopup={setInstallNoticePopup} />}
			{installGuidePopup && <InstallGuide setPopup={setInstallGuidePopup} />}

			<div className="text-4xl font-semibold text-neutral-800 drop-shadow-md">Egenda</div>

			<div className="flex flex-col w-full px-5 -mt-10 gap-y-2">
				{loading ? (
					<Loading />
				) : (
					<>
						{state === 1 ? (
							<button
								type="button"
								onClick={signIn}
								className="!py-2 button !bg-red-500 space-x-3">
								<FontAwesomeIcon icon={faGoogle as IconProp} />
								<span className="w-auto">{t('signInWithGoogle')}</span>
							</button>
						) : (
							''
						)}
						{!window.matchMedia('(display-mode: standalone)').matches && (
							<button
								onClick={() => setInstallGuidePopup(true)}
								className="link !py-2">
								{t('installGuide')}
							</button>
						)}
					</>
				)}
			</div>

			<div className="text-sm text-neutral-500">École secondaire Pierre-Laporte</div>
		</div>
	)
}
