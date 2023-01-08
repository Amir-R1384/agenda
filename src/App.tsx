import { useLayoutEffect } from 'react'
import Div100vh from 'react-div-100vh'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { viewportAtom } from './atoms'
import Main from './Main'
import { Cafeteria, Home, Homeworks, Recoveries, Schedule, Setup } from './pages'
import './translations'
import { getAppearance } from './util'

export default function App() {
	const setViewport = useSetRecoilState(viewportAtom)

	useLayoutEffect(() => {
		const appearance = getAppearance()
		if (appearance === 'dark') {
			document.documentElement.classList.add('dark')
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#262626')
		}
	}, [])

	useLayoutEffect(() => {
		function listener() {
			if (window.innerWidth < 640) {
				setViewport('mobile')
			} else {
				setViewport('desktop')
			}
		}

		listener()

		window.addEventListener('resize', listener)

		return () => window.removeEventListener('resize', listener)
	}, [])

	return (
		<Div100vh>
			<Routes>
				<Route index element={<Setup />} />

				<Route path="/app" element={<Main />}>
					<Route index element={<Home />} />
					<Route path="schedule" element={<Schedule />} />
					<Route path="cafeteria" element={<Cafeteria />} />
					<Route path="homeworks" element={<Homeworks />} />
					<Route path="recoveries" element={<Recoveries />} />
				</Route>
			</Routes>
		</Div100vh>
	)
}
