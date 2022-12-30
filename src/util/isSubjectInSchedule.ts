import { Schedule } from '../types'

export default function isSubjectInSchedule(subject: string, schedule: Schedule<string>) {
	for (let day in schedule) {
		for (let period of schedule[day]) {
			if (period?.subject === subject) {
				return true
			}
		}
	}
	return false
}
