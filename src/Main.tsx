import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, usersCollection } from './api/firebase'
import {
	homeworksAtom,
	loadingAtom,
	recoveriesAtom,
	scheduleAtom,
	schoolDayAtom,
	viewportAtom
} from './atoms'
import { Footer, Header } from './components'
import { saveToLS } from './lib'
import { getSchoolDay } from './util'

export default function Main() {
	const location = useLocation()
	const setSchoolDay = useSetRecoilState(schoolDayAtom)

	const setHomeworks = useSetRecoilState(homeworksAtom)
	const setRecoveries = useSetRecoilState(recoveriesAtom)
	const setSchedule = useSetRecoilState(scheduleAtom)

	const setLoading = useSetRecoilState(loadingAtom)

	const viewport = useRecoilValue(viewportAtom)

	useEffect(() => {
		const schoolDay = getSchoolDay()
		setSchoolDay(schoolDay)
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	useEffect(() => {
		document.body.style.overflow = 'hidden'
	}, [])

	// * Syncing the data with the server in case of changes on other devices
	useEffect(() => {
		// @ts-ignore
		if (window.syncedData) return
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
			// @ts-ignore
			window.syncedData = true
		})
	}, [])

	return (
		<div className="flex flex-col w-full h-full">
			<Header />
			<main className="flex w-full overflow-auto grow">
				{viewport === 'desktop' && <Footer />}
				<div className="flex flex-col items-center flex-1 min-h-full py-5 overflow-x-hidden overflow-y-auto px-main">
					<Outlet />
				</div>
			</main>
			{viewport === 'mobile' && <Footer />}
		</div>
	)
}
