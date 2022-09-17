import { useLayoutEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Div100vh from 'react-div-100vh'
import { Route, Routes } from 'react-router-dom'
import Main from './Main'
import { viewportAtom } from './atoms'
import { Cafeteria, Home, Homeworks, Recoveries, Schedule, Settings, Setup } from './pages'
import './translations'

export default function App() {
	const setViewport = useSetRecoilState(viewportAtom)

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

				<Route path="/settings" element={<Settings />} />
			</Routes>
		</Div100vh>
	)
}
