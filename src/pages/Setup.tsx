import { CalendarOutline, PencilOutline } from '@graywolfai/react-heroicons'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, signIn as FB_signIn, usersCollection } from '../api/firebase'
import github from '../assets/images/github.svg'
import homework from '../assets/videos/homework.mp4'
import { loadingAtom, viewportAtom } from '../atoms'
import { InstallGuide, Loading } from '../components'
import { CardsDesign, FeaturesDesign } from '../components/svgs'
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
			Sign In With Google
		</button>
	) : browser !== 'other' ? (
		<>
			<button onClick={() => setInstallGuidePopup(true)} className="button-filled">
				Install mobile app
			</button>
			<div onClick={signIn} className="bg-neutral-100 button-outline">
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
				className="button-outline bg-neutral-100">
				Install mobile app
			</button>
		</>
	)

	return (
		<>
			<header className="px-5 py-2 bg-white border-b md:px-10 flex-space-between border-neutral-200">
				<div className="text-xl font-bold md:text-2xl text-dark drop-shadow-md">Egenda</div>
				<Loading />
			</header>

			<main
				className={`transition-[opacity] w-screen space-y-20 overflow-x-hidden overflow-y-scroll px-5 md:px-10 pt-10 pb-20 opacity-0 duration-500 ${
					state === 1 && '!opacity-100'
				}`}>
				<section className="flex flex-col items-center w-full mb-[min(25%,200px)] text-center gap-y-10 mt-10">
					<div className="max-w-2xl text-4xl font-black md:text-6xl drop-shadow-md">
						Your entire agenda in your pocket
					</div>
					<div className="max-w-2xl text-para text-dark-2">
						<span>Egenda</span> is made to replace your school agenda and to make daily
						school tasks much easier.
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
						<CalendarOutline className="w-5" />
						<div className="tracking-[.3rem] text-neutral-800 translate-y-px uppercase text-xs md:text-base">
							Schedule
						</div>
					</div>
					<div className="mb-5 font-extrabold text-heading text-dark-1">
						See all your classes with one click
					</div>
					<div className="mb-10 text-dark-2 text-para">
						Instantly see what classes you have for today, tomorrow, yesterday, or any
						day.
					</div>
					<CardsDesign />
				</section>

				<section className="flex flex-col items-center text-center">
					<div className="flex items-center mb-2 gap-x-2">
						<PencilOutline className="w-5" />
						<div className="tracking-[.3rem] text-neutral-800 translate-y-px uppercase text-xs md:text-base">
							Homeworks
						</div>
					</div>
					<div className="mb-5 font-extrabold text-heading text-dark-1">
						Adding homeworks has never been easier
					</div>
					<div className="mb-20 text-dark-2 text-para">
						One of the core features of egenda is making adding homeworks as easy and
						user friendly as possible.
					</div>
					<div className="flex justify-around !items-stretch flex-col md:flex-row gap-y-10">
						<div className="flex flex-col justify-around w-full text-left gap-y-10 md:w-1/2">
							<div>
								<div className="mb-2 text-xl font-semibold md:mb-5 md:text-3xl">
									Don't know which period you have math tomorrow?{' '}
									<span className="font-semibold">No Problem</span>
								</div>
								<div className="text-sm text-para text-dark-2">
									You can either choose the period, or just say mathematics.
									Egenda will automatically find what period you have mathematics
									at that day.
								</div>
							</div>

							<div>
								<div className="mb-2 text-xl font-semibold md:mb-5 md:text-3xl">
									Homework for next class? Don't bother with the date
								</div>
								<div className="text-sm text-para text-dark-2">
									Instead of figuring out the next time you have math, just click
									ont the 'Next class' button. It will find it for you.
								</div>
							</div>
						</div>
						<video
							className="md:w-1/4 w-full brightness-110 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.25)] border-2 rounded-2xl border-dark-1"
							autoPlay
							loop
							muted
							playsInline
							src={homework}></video>
					</div>
				</section>

				<section className="flex flex-col items-center text-center gap-y-5">
					<div className="font-extrabold text-heading text-dark-1">That's not it...</div>
					<div className="max-w-4xl mb-5 text-dark-2 text-para">
						See your <span className="font-semibold">cafeteria menu</span> for the week,
						the <span className="font-semibold">recent news</span> of the school, and
						add your <span className="font-semibold">recovery courses</span> so you
						won't forget them
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
