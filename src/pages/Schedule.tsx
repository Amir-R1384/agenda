import { ChevronLeftOutline, ChevronRightOutline } from '@graywolfai/react-heroicons'
import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { loadingAtom, scheduleAtom } from '../atoms'
import { CardContainer, Loading, Period } from '../components'
import SchedulePopup from '../components/popups/SchedulePopup'
import config from '../config'
import { getSchoolDay } from '../util'

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
			<CardContainer heading="schedule">
				<div className="max-w-screen-md mx-auto mb-5 overflow-visible border rounded-lg bg-neutral-50 flex-space-between border-neutral-300">
					<button onClick={() => changeDate('previous')}>
						<ChevronLeftOutline className="icon" />
					</button>
					<div className="text-dark-1">
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
					<button onClick={() => changeDate('next')}>
						<ChevronRightOutline className="icon" />
					</button>
				</div>

				{loading ? (
					<Loading />
				) : periods ? (
					<div className="custom-grid !grid-cols-1 max-w-screen-lg mx-auto">
						{periods.map(
							(period, i) => period && <Period key={i} index={i} {...period} />
						)}
					</div>
				) : typeof currentSchoolDay == 'number' ? (
					<div className="flex flex-col items-center gap-y-3">
						<div className="w-full no-data">{t('noSchedule')}</div>
						<button onClick={() => setPopup(true)} className="button-filled !bg-dark-2">
							{t('addSchedule')}
						</button>
					</div>
				) : (
					<div className="no-data">{t('noSchool')}</div>
				)}
			</CardContainer>

			<SchedulePopup visible={popup} setVisible={setPopup} />
		</>
	)
}
