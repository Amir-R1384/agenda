import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { loadingAtom, scheduleAtom, schoolDayAtom } from '../atoms'
import { Period, Heading, Loading } from '../components'
import SchedulePopup from '../components/popups/SchedulePopup'
import { getOtherDay, getSchoolDay } from '../util'
import { Page } from '../types'

type PeriodState = (null | (null | { subject: string; roomNumber: string })[])[]

export default function Schedule() {
	const { t } = useTranslation()
	const loading = useRecoilValue(loadingAtom)
	const schedule = useRecoilValue(scheduleAtom)
	const [periods, setPeriods] = useState<PeriodState>([])
	const [popup, setPopup] = useState(false)
	const [page, setPage] = useState<Page>(1)
	const schoolDays = [
		getSchoolDay(getOtherDay('yesterday')),
		useRecoilValue(schoolDayAtom),
		getSchoolDay(getOtherDay('tomorrow'))
	]

	useLayoutEffect(() => {
		const periods: PeriodState = []

		schoolDays.forEach(schoolDay => {
			periods.push(
				typeof schoolDay === 'number' && schedule[schoolDay - 1]?.some(el => el !== null)
					? schedule[schoolDay - 1]
					: null
			)
		})
		setPeriods(periods)
	}, [schedule, loading])

	return (
		<>
			<Heading title="schedule" />
			<div className="flex items-center justify-between w-full max-w-screen-md px-3 overflow-visible border rounded-lg border-neutral-300">
				<button
					onClick={() => setPage(prev => (prev !== 0 ? ((prev - 1) as Page) : prev))}
					className="grid place-items-center">
					<FontAwesomeIcon
						className={` w-4 h-8 drop-shadow-md ${
							page === 0 ? 'text-neutral-400' : 'text-neutral-700'
						}`}
						icon={faCaretLeft as IconProp}
					/>
				</button>
				<div className="text-neutral-600">
					{t(page === 0 ? 'yesterday' : page === 1 ? 'today' : 'tomorrow')}{' '}
					{page !== 1 && '- '}
					{page === 1
						? ''
						: schoolDays[page] === undefined
						? t('notInList')
						: typeof schoolDays[page] === 'number'
						? `${t('day')} ${schoolDays[page]}`
						: t(schoolDays[page] as string)}
				</div>
				<button
					onClick={() => setPage(prev => (prev !== 2 ? ((prev + 1) as Page) : prev))}
					className="grid place-items-center">
					<FontAwesomeIcon
						className={`w-4 h-8 drop-shadow-md ${
							page === 2 ? 'text-neutral-400' : 'text-neutral-700'
						}`}
						icon={faCaretRight as IconProp}
					/>
				</button>
			</div>

			{loading ? (
				<Loading />
			) : (
				<div
					className="relative z-20 flex w-screen px-3 overflow-hidden gap-x-6 sm:w-full"
					style={{ flexWrap: 'nowrap' }}>
					{periods.map((period, i) => (
						<div
							key={i}
							className="flex flex-col items-center w-full min-w-full transition-transform duration-500 ease-in-out gap-y-5"
							style={{
								transform: `translateX(calc((-100% - 1.5rem) * ${page}))`
							}}>
							<div className="w-full max-w-screen-lg mx-auto space-y-5">
								{typeof schoolDays[i] !== 'number' ? (
									<div className="no-data">
										{t('noSchool')}{' '}
										{t(
											page === 0
												? 'yesterday'
												: page === 1
												? 'today'
												: 'tomorrow'
										).toLowerCase()}
									</div>
								) : period ? (
									period.map(
										(period, i) =>
											period && <Period key={i} index={i} {...period} />
									)
								) : (
									<>
										<div className="no-data">{t('noSchedule')}</div>
										<button
											onClick={() => setPopup(true)}
											className="button !py-2 !px-10 mx-auto block">
											{t('addSchedule')}
										</button>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			)}
			{popup && <SchedulePopup visible={popup} setVisible={setPopup} />}
		</>
	)
}
