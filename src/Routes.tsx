import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Div100vh from 'react-div-100vh'
import { Home, Schedule, Cafeteria, Homeworks, Recoveries, Settings, Setup } from './pages'
import { groupNumberAtom } from './atoms'
import App from './App'

export default function AppRoutes() {
	const groupNumber = useRecoilValue(groupNumberAtom)

	useEffect(() => {
		localStorage.setItem('groupNumber', groupNumber)
	}, [groupNumber])

	return (
		<Div100vh>
			<Routes>
				{!groupNumber || !JSON.parse(groupNumber) ? (
					<Route path="*" element={<Setup />} />
				) : (
					<>
						<Route element={<App />}>
							<Route path="/" element={<Home />} />
							<Route path="/schedule" element={<Schedule />} />
							<Route path="/cafeteria" element={<Cafeteria />} />
							<Route path="/homeworks" element={<Homeworks />} />
							<Route path="/recoveries" element={<Recoveries />} />
						</Route>
						<Route path="/settings" element={<Settings />} />{' '}
					</>
				)}
			</Routes>
		</Div100vh>
	)
}
