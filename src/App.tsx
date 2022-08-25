import Div100vh from 'react-div-100vh'
import { Route, Routes } from 'react-router-dom'
import Main from './Main'
import { Cafeteria, Home, Homeworks, Recoveries, Schedule, Settings, Setup } from './pages'
import './translations'

export default function App() {
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
