import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
	homeworksAtom,
	loadingAtom,
	recoveriesAtom,
	scheduleAtom,
	schoolDayAtom,
	viewportAtom
} from './atoms'
import { Footer, Header, UpdateNotice } from './components'
import { getSchoolDay } from './util'
import { usersCollection, auth } from './api/firebase'
import { saveToLS } from './lib'

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
		<div className="flex flex-col w-full h-full flex-nowrap">
			<Header />
			<main className="w-full overflow-auto grow sm:flex sm:flex-1 ">
				{viewport === 'desktop' && <Footer />}
				<div className="items-center flex-1 min-h-full overflow-x-hidden overflow-y-auto gap-y-5">
					<UpdateNotice />
					<div className="flex flex-col items-center px-3 py-3 gap-y-5 sm:px-5">
						<Outlet />
					</div>
				</div>
			</main>
			{viewport === 'mobile' && <Footer />}
		</div>
	)
}
