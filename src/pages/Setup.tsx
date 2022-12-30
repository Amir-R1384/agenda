import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, signIn as FB_signIn, usersCollection } from '../api/firebase'
import design from '../assets/images/design.svg'
import { loadingAtom, viewportAtom } from '../atoms'
import { InstallGuide, Loading } from '../components'
import { getBrowser } from '../util'

export default function Setup() {
	const navigate = useNavigate()

	const [state, setState] = useState<0 | 1>(0) // 0: Welcome screen, 1: Sign In
	const setLoading = useSetRecoilState(loadingAtom)

	const [installGuidePopup, setInstallGuidePopup] = useState(false)

	const isPWA = window.matchMedia('(display-mode: standalone)').matches
	const viewport = useRecoilValue(viewportAtom)
	const browser = getBrowser(navigator)

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
			// setLoading(false)
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
				navigate('/app/')
			} else {
				await setDoc(doc(usersCollection, uid), {
					schedule: {},
					homeworks: [],
					recoveries: []
				})
				setLoading(false)
			}
		} catch (err: any) {
			if (err.code !== 'auth/popup-closed-by-user') {
				alert(t('problem'))
			}
			setLoading(false)
		}
	}

	return (
		<>
			<header className="px-5 py-2 bg-white border-b md:px-10 flex-space-between border-neutral-200">
				<div className="text-xl font-bold md:text-2xl text-dark drop-shadow-md">Egenda</div>
				<Loading />
			</header>

			<main
				className={`transition-all px-5 md:px-10 mt-10 opacity-0 duration-500 ${
					state === 1 && '!opacity-100'
				}`}>
				<div className="flex justify-between w-full gap-x-10">
					<div className="w-full text-center md:w-1/2 md:text-left">
						<div className="my-10 text-3xl font-black md:text-6xl drop-shadow-md">
							Your entire agenda in your pocket
						</div>
						<div className="mb-5 md:mb-10 text-dark-2">
							<span>Egenda</span> is made to replace your school agenda and to make
							daily school tasks much easier.
						</div>
						<div className="flex flex-col items-center gap-3 md:flex-row">
							{isPWA ? (
								<button onClick={signIn} className="button-filled">
									Sign In With Google
								</button>
							) : browser !== 'other' ? (
								<>
									<button
										onClick={() => setInstallGuidePopup(true)}
										className="button-filled">
										Install mobile app
									</button>
									<div onClick={signIn} className="button-outline">
										Continue in browser
									</div>
								</>
							) : (
								<>
									<button onClick={signIn} className="button-filled">
										Sign In With Google
									</button>
									<button
										onClick={() => setInstallGuidePopup(true)}
										className="button-outline">
										Install mobile app
									</button>
								</>
							)}
						</div>
					</div>
					<img className="hidden mr-20 md:block" src={design} alt="Design" />
				</div>
			</main>

			<InstallGuide visible={installGuidePopup} setVisible={setInstallGuidePopup} />
		</>
	)
}
