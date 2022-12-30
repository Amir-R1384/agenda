import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import config from '../../config'
import { Homework as HomeworkType } from '../../types'
import { convertToYMD, getPeriod } from '../../util'

interface Props extends HomeworkType {
	onClick: MouseEventHandler
}

export default function Homework({ timestamp, period, subject, name, onClick }: Props) {
	const { t } = useTranslation()

	const dateObj = new Date(timestamp)
	const date = dateObj.getDate()
	const day = dateObj.getDay()
	const month = dateObj.getMonth()

	const { type: PeriodType, number: periodNumber } = getPeriod(period)

	//  We want the date at 00:00
	const pastDueDate = timestamp <= new Date(convertToYMD(new Date())).valueOf()

	return (
		<div className="flex flex-col">
			<div onClick={onClick} className="card hover">
				<div className="flex-space-between card-sub">
					<div>{t(subject)}</div>
					<div>
						{t(config.daysInWeek[day])}, {t(config.months[month])} {date} -{' '}
						{t(PeriodType)} {periodNumber}
					</div>
				</div>
				<div className="card-main">{name}</div>
			</div>
			{/* Past due date alert */}
			{pastDueDate && <div className="ml-2 text-xs text-red-500">{t('pastDueDate')}</div>}
		</div>
	)
}
