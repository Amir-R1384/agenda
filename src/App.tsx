import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Header, Footer } from './components'
import { schoolDayAtom } from './atoms'
import { getSchoolDay } from './util'
import './translations'

export default function App() {
	const location = useLocation()
	const setSchoolDay = useSetRecoilState(schoolDayAtom)

	useEffect(() => {
		const schoolDay = getSchoolDay('5/24/2022')
		setSchoolDay(schoolDay)
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

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
