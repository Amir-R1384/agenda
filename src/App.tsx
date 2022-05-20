import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import Period from './components/Period'
import config from './config.json'

export default function App() {
	const [isClass, setIsClass] = useState(true)
	const [day, setDay] = useState<any>('')
	const [subjects, setSubjects] = useState<string[]>([])

	useEffect(() => {
		const begining = new Date(config.beginingDay).valueOf()
		const now = new Date().valueOf()
		const daysDiff = Math.floor((now - begining) / 1000 / 60 / 60 / 24)
		console.log(daysDiff)

		const day: string | number | null = config.days[daysDiff]
		if (!day || day === 'we' || day === 'c' || day === 'jp') {
			setIsClass(false)
		} else {
			setSubjects(config.subjects[Number(day) - 1])
		}
		setDay(day)
	}, [])

	return (
		<Div100vh>
			<div className="flex flex-col w-full max-w-sm min-h-full p-5 mx-auto gap-y-10">
				{/* Header */}
				<div className="flex justify-between w-full">
					<h1 className="text-2xl font-semibold text-gray-800 drop-shadow-md">Agenda</h1>
					<div className="text-xl font-medium text-gray-600 drop-shadow-md">
						{!day
							? 'Not in list'
							: day === 'c'
							? 'Holiday'
							: day === 'jp'
							? 'pedagogic'
							: day === 'we'
							? 'week-end'
							: 'Day ' + day}
					</div>
				</div>
				<div className="flex flex-col gap-y-5">
					{isClass &&
						[0, 1, 2, 3].map(el => (
							<Period key={el} index={el} subject={subjects[el]} />
						))}
				</div>
			</div>
		</Div100vh>
	)
}
