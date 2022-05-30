import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Period from './components/Period'
import Div100vh from 'react-div-100vh'
import config from './config'
import { Day } from './types'
import './translations'

export default function App() {
	const [day, setDay] = useState<Day>()
	const [subjects, setSubjects] = useState<string[]>([])
	const { t } = useTranslation()

	useEffect(() => {
		const begining = new Date(config.beginingDay).valueOf()
		const now = new Date().valueOf()
		const daysDiff = Math.floor((now - begining) / 1000 / 60 / 60 / 24)

		const day = config.days[daysDiff]

		if (typeof day === 'number') {
			setSubjects(config.subjects[Number(day) - 1])
		}
		setDay(day)
	}, [])

	return (
		<Div100vh>
			<div className="flex flex-col w-full h-full max-w-sm p-5 mx-auto gap-y-10">
				{/* Header */}
				<div className="flex justify-between w-full">
					<h1 className="text-2xl font-semibold text-gray-800 notranslate drop-shadow-md">
						Agenda
					</h1>
					<div className="text-xl font-medium text-gray-600 drop-shadow-md">
						{day === undefined
							? t('notInList')
							: typeof day === 'number'
							? `${t('day')} ${day}`
							: t(day)}
					</div>
				</div>
				{/* Body */}
				<div id="body" className="flex flex-col flex-1 overflow-auto gap-y-5">
					{typeof day === 'number' &&
						[0, 1, 2, 3].map(el => (
							<Period key={el} index={el} subject={t(subjects[el])} />
						))}
				</div>
			</div>
		</Div100vh>
	)
}
