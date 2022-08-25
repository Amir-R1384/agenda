import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'
import { groupNumberAtom, homeworksAtom, loadingAtom, recoveriesAtom, schoolDayAtom } from './atoms'
import { Footer, Header } from './components'
import { getSchoolDay } from './util'
import { usersCollection, auth } from './api'
import { saveToLS } from './lib'

export default function Main() {
	const location = useLocation()
	const setSchoolDay = useSetRecoilState(schoolDayAtom)

	const setGroupNumber = useSetRecoilState(groupNumberAtom)
	const setHomeworks = useSetRecoilState(homeworksAtom)
	const setRecoveries = useSetRecoilState(recoveriesAtom)

	const setLoading = useSetRecoilState(loadingAtom)

	useEffect(() => {
		const schoolDay = getSchoolDay('5/24/2022') // Test day
		setSchoolDay(schoolDay)
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	// * Syncing the data with the server in case of changes on other devices
	useEffect(() => {
		onAuthStateChanged(auth, async user => {
			setLoading(true)

			const snapshot = await getDoc(doc(usersCollection, user?.uid))
			const { groupNumber, homeworks, recoveries } = snapshot.data()!

			saveToLS('groupNumber', groupNumber)
			saveToLS('homeworks', homeworks)
			saveToLS('recoveries', recoveries)

			setGroupNumber(groupNumber)
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
