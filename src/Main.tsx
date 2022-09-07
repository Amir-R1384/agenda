import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'
import { homeworksAtom, loadingAtom, recoveriesAtom, scheduleAtom, schoolDayAtom } from './atoms'
import { Footer, Header } from './components'
import { getSchoolDay } from './util'
import { usersCollection, auth } from './api'
import { saveToLS } from './lib'

export default function Main() {
	const location = useLocation()
	const setSchoolDay = useSetRecoilState(schoolDayAtom)

	const setHomeworks = useSetRecoilState(homeworksAtom)
	const setRecoveries = useSetRecoilState(recoveriesAtom)
	const setSchedule = useSetRecoilState(scheduleAtom)

	const setLoading = useSetRecoilState(loadingAtom)

	useEffect(() => {
		const schoolDay = getSchoolDay()
		setSchoolDay(schoolDay)
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	// * Syncing the data with the server in case of changes on other devices
	useEffect(() => {
		setLoading(true)
		onAuthStateChanged(auth, async user => {
			const snapshot = await getDoc(doc(usersCollection, user?.uid))

			const { schedule, homeworks, recoveries } = snapshot.data()!

			saveToLS('schedule', schedule)
			saveToLS('homeworks', homeworks)
			saveToLS('recoveries', recoveries)

			setSchedule(schedule)
			setHomeworks(homeworks)
			setRecoveries(recoveries)

			setLoading(false)
		})
	}, [])

	useEffect(() => {
		const root = document.querySelector(':root')! as HTMLElement
		const rootStyles = getComputedStyle(root)

		const safeAreaInsetTop = Number(rootStyles.getPropertyValue('--header-height').slice(0, -2))
		const safeAreaInsetBottom = Number(
			rootStyles.getPropertyValue('--footer-height').slice(0, -2)
		)

		const headerHeight = document.querySelector('header')!.offsetHeight
		const footerHeight = document.querySelector('footer')!.offsetHeight

		// Stop if already corrected the height
		if (headerHeight === safeAreaInsetTop) return

		root.style.setProperty('--header-height', `${safeAreaInsetTop + headerHeight}px`)
		root.style.setProperty('--footer-height', `${safeAreaInsetBottom + footerHeight}px`)
	}, [])

	return (
		<>
			<Header />
			<main className="w-full px-3 overflow-auto -z-10">
				<div className="flex flex-col items-center gap-y-5">
					<Outlet />
				</div>
			</main>
			<Footer />
		</>
	)
}
