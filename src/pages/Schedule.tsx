import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { loadingAtom, scheduleAtom } from '../atoms'
import { Period, Heading, Loading } from '../components'
import SchedulePopup from '../components/popups/SchedulePopup'
import { getSchoolDay } from '../util'
import config from '../config'

type PeriodState = null | (null | { subject: string; roomNumber: string })[]

export default function Schedule() {
	const { t } = useTranslation()
	const loading = useRecoilValue(loadingAtom)
	const schedule = useRecoilValue(scheduleAtom)
	const [popup, setPopup] = useState(false)
	const [currentDate, setCurrentDate] = useState(new Date())
	const currentSchoolDay = getSchoolDay(currentDate)
	const [periods, setPeriods] = useState<PeriodState>([])

	useLayoutEffect(() => {
		setPeriods(
			typeof currentSchoolDay === 'number' &&
				schedule[currentSchoolDay - 1]?.some(el => el !== null)
				? schedule[currentSchoolDay - 1]
				: null
		)
	}, [currentDate, schedule])

	function changeDate(direction: 'previous' | 'next') {
		if (direction === 'previous') {
			currentDate.setDate(currentDate.getDate() - 1)
		} else {
			currentDate.setDate(currentDate.getDate() + 1)
		}

		setCurrentDate(new Date(currentDate))
	}

	return (
		<>
			<Heading title="schedule" />

			<div className="flex items-center justify-between w-full max-w-screen-md px-3 overflow-visible border rounded-lg border-neutral-300">
				<button onClick={() => changeDate('previous')} className="grid place-items-center">
					<FontAwesomeIcon
						className="w-4 h-8 drop-shadow-md"
						icon={faCaretLeft as IconProp}
					/>
				</button>
				<div className="text-neutral-600">
					{currentDate.toDateString() === new Date().toDateString()
						? t('today')
						: currentDate.getDate() +
						  ' ' +
						  t(config.months[currentDate.getMonth()]) +
						  ' - ' +
						  (currentSchoolDay === undefined
								? t('notInList')
								: typeof currentSchoolDay === 'number'
								? `${t('day')} ${currentSchoolDay}`
								: t(currentSchoolDay as string))}
				</div>
				<button onClick={() => changeDate('next')} className="grid place-items-center">
					<FontAwesomeIcon
						className="w-4 h-8 drop-shadow-md"
						icon={faCaretRight as IconProp}
					/>
				</button>
			</div>

			{loading ? (
				<Loading />
			) : periods ? (
				<div className="flex flex-col items-stretch w-full max-w-screen-lg gap-y-5">
					{periods.map((period, i) => period && <Period key={i} index={i} {...period} />)}
				</div>
			) : typeof currentSchoolDay == 'number' ? (
				<>
					<div className="no-data">{t('noSchedule')}</div>
					<button
						onClick={() => setPopup(true)}
						className="button !py-2 !px-10 mx-auto block">
						{t('addSchedule')}
					</button>
				</>
			) : (
				<div className="no-data">{t('noSchool')}</div>
			)}
			{popup && <SchedulePopup visible={popup} setVisible={setPopup} />}
		</>
	)
}
