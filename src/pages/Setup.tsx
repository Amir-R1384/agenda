import { CalendarOutline, PencilOutline } from '@graywolfai/react-heroicons'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, signIn as FB_signIn, usersCollection } from '../api/firebase'
import github from '../assets/images/github.svg'
import addHomeworkEn from '../assets/videos/addHomeworkEn.mp4'
import addHomeworkFr from '../assets/videos/addHomeworkFr.mp4'
import { loadingAtom, viewportAtom } from '../atoms'
import { InstallGuide, Loading } from '../components'
import { CardsDesignEn, CardsDesignFr, FeaturesDesign } from '../components/svgs'
import i18n from '../translations'
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
	const currentLang = i18n.language.slice(0, 2)

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

	const buttons = isPWA ? (
		<button onClick={signIn} className="button-filled">
			{t('signInWithGoogle')}
		</button>
	) : browser !== 'other' ? (
		<>
			<button onClick={() => setInstallGuidePopup(true)} className="button-filled">
				{t('installMobileApp')}
			</button>
			<div onClick={signIn} className="bg-neutral-100 dark:bg-neutral-900 button-outline">
				{t('continueInBrowser')}
			</div>
		</>
	) : (
		<>
			<button onClick={signIn} className="button-filled">
				{t('signInWithGoogle')}
			</button>
			<button
				onClick={() => setInstallGuidePopup(true)}
				className="button-outline bg-neutral-100">
				{t('installMobileApp')}
			</button>
		</>
	)

	return (
		<>
			<header className="px-5 py-2 bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 md:px-10 flex-space-between border-neutral-200">
				<div className="text-xl font-bold text-primary md:text-2xl text-dark drop-shadow-md">
					Egenda
				</div>
				<Loading />
			</header>

			<main
				className={`transition-[opacity] w-screen space-y-20 overflow-x-hidden px-5 md:px-10 pt-10 pb-20 opacity-0 duration-500 ${
					state === 1 && '!opacity-100'
				}`}>
				<section className="flex flex-col items-center w-full mb-[min(25%,200px)] text-center gap-y-10 mt-10">
					<div className="max-w-2xl text-4xl font-black md:text-6xl dark:text-white drop-shadow-md">
						{t('mainHeading')}
					</div>
					<div className="max-w-2xl text-para text-secondary">
						<span>Egenda</span> {t('mainDesc')}
					</div>
					<div className="flex flex-col items-stretch gap-3 md:flex-row">{buttons}</div>

					<div className="absolute top-0 w-full pb-10 overflow-x-hidden md:-top-10 -z-50">
						<div className="inline-flex justify-center scale-125">
							<FeaturesDesign />
							{viewport === 'desktop' && (
								<>
									<FeaturesDesign />
									<FeaturesDesign />
									<FeaturesDesign />
								</>
							)}
						</div>
					</div>
				</section>

				<section className="flex flex-col items-center text-center">
					<div className="flex items-center mb-2 gap-x-2">
						<CalendarOutline className="w-5 icon" />
						<div className="tracking-[.3rem] text-primary translate-y-px uppercase text-xs md:text-base">
							{t('schedule')}
						</div>
					</div>
					<div className="mb-5 font-extrabold text-heading text-primary">
						{t('scheduleHeading')}
					</div>
					<div className="mb-10 text-secondary text-para">{t('scheduleDesc')}</div>
					{currentLang === 'en' ? <CardsDesignEn /> : <CardsDesignFr />}
				</section>

				<section className="flex flex-col items-center text-center">
					<div className="flex items-center mb-2 gap-x-2">
						<PencilOutline className="w-5 icon" />
						<div className="tracking-[.3rem] text-primary translate-y-px uppercase text-xs md:text-base">
							{t('homeworks')}
						</div>
					</div>
					<div className="mb-5 font-extrabold text-heading text-primary">
						{t('homeworksHeading')}
					</div>
					<div className="mb-20 text-secondary text-para">{t('homeworksDesc')}</div>
					<div className="flex justify-around !items-stretch flex-col md:flex-row gap-y-10">
						<div className="flex flex-col justify-around w-full text-left gap-y-10 md:w-1/2">
							<div>
								<div className="mb-2 text-xl font-semibold text-secondary md:mb-5 md:text-3xl ">
									{t('example1Heading')}
								</div>
								<div className="text-sm text-para text-secondary">
									{t('example1Desc')}
								</div>
							</div>

							<div>
								<div className="mb-2 text-xl font-semibold text-secondary md:mb-5 md:text-3xl">
									{t('example2Heading')}
								</div>
								<div className="text-sm text-para text-secondary">
									{t('example2Desc')}
								</div>
							</div>
						</div>
						<video
							className="md:w-1/4 w-full brightness-110 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.25)] border-2 rounded-2xl border-primary"
							autoPlay
							loop
							muted
							playsInline
							src={currentLang === 'en' ? addHomeworkEn : addHomeworkFr}></video>
					</div>
				</section>

				<section className="flex flex-col items-center text-center gap-y-5">
					<div className="font-extrabold text-heading text-primary">{t('notIt')}</div>
					<div className="max-w-4xl mb-5 text-secondary text-para">
						{t('otherFeatures')}
					</div>

					<div className="flex flex-col items-stretch gap-y-2 gap-x-5 md:flex-row">
						{buttons}
					</div>
				</section>
			</main>

			<footer className="px-5 py-3 bg-neutral-800 flex-space-between">
				<div className="text-xl font-bold text-neutral-200 md:text-2xl drop-shadow-md">
					Egenda
				</div>

				<a target="_blank" href="https://github.com/Amir-R1384/agenda">
					<img src={github} />
				</a>
			</footer>

			<InstallGuide visible={installGuidePopup} setVisible={setInstallGuidePopup} />
		</>
	)
}
