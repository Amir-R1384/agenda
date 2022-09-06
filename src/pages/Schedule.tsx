import { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { loadingAtom, scheduleAtom, schoolDayAtom } from '../atoms'
import { Period, Heading, Loading } from '../components'
import SchedulePopup from '../components/popups/SchedulePopup'

export default function Schedule() {
	const { t } = useTranslation()
	const loading = useRecoilValue(loadingAtom)
	const schoolDay = useRecoilValue(schoolDayAtom)
	const schedule = useRecoilValue(scheduleAtom)
	const [periods, setPeriods] = useState<
		(null | { subject: string; roomNumber: string })[] | null
	>(null)
	const [popup, setPopup] = useState(false)

	useLayoutEffect(() => {
		if (typeof schoolDay === 'number') {
			setPeriods(schedule[schoolDay - 1])
		}
	}, [schedule, schoolDay, loading])

	return (
		<>
			<Heading title="schedule" />
			{loading ? (
				<Loading />
			) : periods ? (
				periods.map((period, i) => period && <Period key={i} index={i} {...period} />)
			) : (
				<>
					<div className="no-data">{t('noSchedule')}</div>
					<button onClick={() => setPopup(true)} className="button !py-2 !px-10">
						{t('addSchedule')}
					</button>
				</>
			)}
			{popup && <SchedulePopup visible={popup} setVisible={setPopup} />}
		</>
	)
}
