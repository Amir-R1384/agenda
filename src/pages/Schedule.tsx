import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { groupNumberAtom, schoolDayAtom } from '../atoms'
import { Period, Heading } from '../components'
import config from '../config'

export default function Schedule() {
	const schoolDay = useRecoilValue(schoolDayAtom)
	const [periods, setPeriods] = useState<string[]>([])
	const groupNumber = useRecoilValue(groupNumberAtom)

	useEffect(() => {
		if (typeof schoolDay === 'number') {
			setPeriods(config.subjects[groupNumber!][schoolDay - 1] as string[])
		}
	}, [schoolDay])

	return (
		<>
			<Heading title="schedule" />
			{periods.map((subject, i) => subject && <Period key={i} index={i} subject={subject} />)}
		</>
	)
}
