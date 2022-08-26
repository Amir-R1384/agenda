import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { schoolDayAtom } from '../atoms'
import config from '../config'

export default function DayInfo() {
	const schoolDay = useRecoilValue(schoolDayAtom)
	const [dateInfo, setDateInfo] = useState<{
		day: number
		date: number
		month: number
		year: number
	}>({
		day: 0,
		date: 0,
		month: 0,
		year: 0
	})
	const { t } = useTranslation()

	useEffect(() => {
		const dateObj = new Date()
		const day = dateObj.getDay()
		const date = dateObj.getDate()
		const month = dateObj.getMonth()
		const year = dateObj.getFullYear()
		setDateInfo({ day, date, month, year })
	}, [])

	return (
		<div className="flex items-center justify-between w-full text-xs font-medium uppercase text-neutral-400">
			<div>
				{t(config.daysInWeek[dateInfo.day])}, {dateInfo.date}{' '}
				{t(config.months[dateInfo.month])} {dateInfo.year}
			</div>
			<div>
				{schoolDay === undefined
					? t('notInList')
					: typeof schoolDay === 'number'
					? `${t('day')} ${schoolDay}`
					: t(schoolDay)}
			</div>
		</div>
	)
}